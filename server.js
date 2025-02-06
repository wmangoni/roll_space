const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const users = new Set();

wss.on('connection', (ws) => {
    let username = '';

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'join') {
            username = data.username;
            users.add(username);
            broadcastUserList();
            broadcast(`${username} entrou no chat.`);
        } else if (data.type === 'message') {
            broadcast(`${username}: ${data.text}`);
        } else if (data.type === 'roll') {
            const result = rollDice(data.faces);
            broadcast(`${username} rolou um d${data.faces} e obteve: ${result}`);
        }
    });

    ws.on('close', () => {
        if (username) {
            users.delete(username);
            broadcastUserList();
            broadcast(`${username} saiu do chat.`);
        }
    });

    function broadcast(message) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'message', text: message }));
            }
        });
    }

    function broadcastUserList() {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'userList', users: Array.from(users) }));
            }
        });
    }

    function rollDice(faces) {
        return Math.floor(Math.random() * faces) + 1;
    }
});

server.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
});
