# Chat RPG com WebSocket

Este é um simples chat para jogos de RPG online, construído com Node.js, Express e WebSockets. Ele permite que os usuários se conectem, enviem mensagens e rolem dados (d4, d6, d8, d10, d12, d20).

## Pré-requisitos

*   **Node.js e npm:** Você precisa ter o Node.js (versão 12 ou superior) e o npm (Node Package Manager) instalados em seu computador. Você pode baixá-los em [https://nodejs.org/](https://nodejs.org/).  A instalação do Node.js normalmente inclui o npm.

## Instalação

1.  **Clone o repositório (ou crie os arquivos manualmente):**

    Se você estiver usando Git, clone este repositório para sua máquina local:

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DA_PASTA_DO_PROJETO>
    ```

    Se você não estiver usando Git, crie a estrutura de pastas e os arquivos manualmente, conforme descrito no código, e copie o código para os arquivos correspondentes. A estrutura deve ser:

    ```
    meu-projeto-rpg/
    ├── node_modules/   (será criada automaticamente pelo npm)
    ├── public/
    │   ├── index.html
    │   ├── script.js
    │   └── style.css
    ├── app.js
    └── package.json
    ```

2.  **Instale as dependências:**

    Abra um terminal (ou prompt de comando) na pasta raiz do projeto (a pasta que contém `app.js` e `package.json`). Execute o seguinte comando para instalar as bibliotecas necessárias:

    ```bash
    npm install
    ```
    Ou, se você criou o `package.json` manualmente:
     ```bash
    npm install express ws
    ```
    Isso instalará o Express (para o servidor web) e o `ws` (para a funcionalidade WebSocket).

## Executando o Chat

1.  **Inicie o servidor:**

    No terminal, ainda na pasta raiz do projeto, execute o seguinte comando:

    ```bash
    node app.js
    ```

    Você deverá ver uma mensagem no console indicando que o servidor está rodando (por exemplo, "Servidor rodando na porta 8080").

2.  **Abra o chat no navegador:**

    Abra *vários* navegadores web (ou abas do mesmo navegador).  Em cada navegador/aba, acesse o seguinte endereço:

    ```
    http://localhost:8080
    ```

3.  **Comece a usar:**

    *   Na primeira vez que você se conectar, digite seu nome de usuário no campo de texto e pressione Enter.  Isso fará você entrar no chat.
    *   Digite mensagens no campo de texto e pressione Enter para enviá-las.
    *   Clique nos botões (d4, d6, etc.) para rolar os dados correspondentes.
    *   A lista de usuários online será exibida no painel à direita.

## Notas Importantes

*   **Várias Abas/Navegadores:** Para simular vários usuários, você *precisa* abrir o chat em várias abas ou navegadores diferentes.
*   **Porta 8080:**  O código usa a porta 8080 por padrão.  Se essa porta estiver em uso por outro aplicativo, você precisará alterar o número da porta no código (`app.js`) e no endereço que você usa no navegador.
*   **Sem Persistência:** As mensagens e a lista de usuários *não* são salvas.  Se você reiniciar o servidor, tudo será perdido.  Para adicionar persistência, você precisaria usar um banco de dados ou um sistema de arquivos.
*   **Localhost:** O chat, da forma como está configurado, só funciona na sua máquina local (`localhost`).  Para que outras pessoas possam acessá-lo, você precisaria implantar o servidor em um serviço de hospedagem (como Heroku, AWS, DigitalOcean, etc.) e configurar um domínio.

## Solução de Problemas

*   **Erro "Cannot GET /":** Se você vir esse erro no navegador, verifique se você iniciou o servidor (`node app.js`) e se está acessando o endereço correto (`http://localhost:8080`).  Certifique-se também de que você tem a pasta `public` com os arquivos `index.html`, `script.js` e `style.css` no local correto.
*   **O WebSocket não conecta:** Verifique o console do navegador (geralmente pressionando F12) em busca de erros relacionados ao WebSocket.  Certifique-se de que o servidor está rodando e de que não há nenhum firewall bloqueando a conexão.  O endereço do WebSocket no `script.js` (`ws://localhost:8080`) deve corresponder ao endereço do servidor.
*   **O npm install falha:** Verifique se você tem o Node.js e o npm instalados corretamente.  Tente executar `npm install` novamente.  Se o problema persistir, procure a mensagem de erro específica online para obter ajuda.
* **Não vejo a mensagem "Servidor rodando na porta 8080":** Verifique se o comando `node app.js` foi executado com sucesso, sem erros no terminal.
