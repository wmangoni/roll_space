const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path'); // Importe o módulo 'path'

const app = express();

// Sirva arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const users = {}; // Use um objeto para armazenar usuários (nome: WebSocket)

wss.on('connection', (ws) => {
    let username = '';

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === 'join') {
                if (!data.username || data.username.trim() === '' || users[data.username.trim()]) {
                    ws.send(JSON.stringify({ type: 'error', message: 'Nome de usuário inválido ou já em uso.' }));
                    return;
                }
                username = data.username.trim();
                users[username] = ws;
                broadcastUserList();
                broadcast(`${username} entrou no chat.`);
            } else if (data.type === 'message') {
                if (!data.text || data.text.trim() === '') {
                    return; // Ignora mensagens vazias
                }
                broadcast(`${username}: ${data.text}`);
            } else if (data.type === 'roll') {
                const result = rollDice(data.faces);
                broadcast(`${username} rolou um d${data.faces} e obteve: ${result}`);
            }
        } catch (error) {
            console.error('Erro ao processar mensagem:', error);
            //Você pode enviar uma mensagem pro usuário com o erro.
            ws.send(JSON.stringify({type: 'error', message: 'Erro ao processar a mensagem'}));
        }
    });

    ws.on('close', () => {
        if (username) {
            delete users[username];
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
        const userList = Object.keys(users); // Obtém apenas os nomes dos usuários
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'userList', users: userList }));
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
