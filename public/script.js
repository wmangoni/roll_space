const ws = new WebSocket('ws://localhost:8080');
let username = '';

const messagesDiv = document.getElementById('messages');
const userListDiv = document.getElementById('userList');
const messageInput = document.getElementById('messageInput');
const diceButtons = document.querySelectorAll('#controls button');

// Evento: Nova mensagem recebida do servidor
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'message') {
        addMessage(data.text);
    } else if (data.type === 'userList') {
        updateUserList(data.users);
    } else if (data.type === 'error') {
        alert(data.message); // Mostra mensagens de erro
    }
};

// Evento: Erro na conexão WebSocket
ws.onerror = (error) => {
    console.error('Erro WebSocket:', error);
    addMessage('Erro na conexão com o servidor.');
};

// Evento: Conexão WebSocket fechada
ws.onclose = () => {
    addMessage('Conexão com o servidor perdida.');
};

//Função para adicionar mensagens, limpando o innerHTML para segurança
function addMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message; // Usa textContent para evitar XSS
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll para a última mensagem
}

//Função para atualizar a lista de usuários, limpando o innerHTML
function updateUserList(users) {
    userListDiv.innerHTML = '<strong>Usuários Online:</strong><br>'; // Limpa a lista
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.textContent = user;
        userListDiv.appendChild(userElement);
    });
}

// Evento: Pressionar Enter no campo de mensagem
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const message = messageInput.value.trim();
        if (message) {
            if (!username) {
                username = message;
                ws.send(JSON.stringify({ type: 'join', username: username }));
            } else {
                ws.send(JSON.stringify({ type: 'message', text: message }));
            }
            messageInput.value = '';
        }
    }
});

// Evento: Clique nos botões de dado
diceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const faces = parseInt(button.dataset.faces);
        ws.send(JSON.stringify({ type: 'roll', faces: faces }));
    });
});
