# Readme
## Projeto fullstack to-do-list com JavaScript e Node.js
![Badge de Status do Projeto](https://img.shields.io/badge/status-conclu%C3%ADdo-brightgreen)

Este é um projeto de uma aplicação de Lista de Tarefas (To-Do List) completo, construído do zero com uma arquitetura Full-Stack. A aplicação permite que usuários se cadastrem, façam login de forma segura e gerenciem suas próprias tarefas pessoais através de uma interface interativa. O projeto foi desenvolvido para demonstrar habilidades em desenvolvimento backend com Node.js e frontend com JavaScript puro.<br>
![Tela de cadastro](https://github.com/Flaviabenegas/Projeto-ToDoList/blob/master/img/cadastro.png)<br>
![Tela de login](https://github.com/Flaviabenegas/Projeto-ToDoList/blob/master/img/tela-login.png)
![Tela de tarefas](https://github.com/Flaviabenegas/Projeto-ToDoList/blob/master/img/tela-tarefas.png)

## ✨ Funcionalidades

* **Autenticação de Usuários:**
    * Cadastro de novos usuários com hash de senha.
    * Login seguro com geração de Token JWT (JSON Web Token).
* **Gerenciamento de Tarefas (CRUD):**
    * **Criar:** Adicionar novas tarefas.
    * **Ler:** Visualizar apenas as tarefas do usuário logado.
    * **Atualizar:** Marcar tarefas como concluídas e editar o título.
    * **Apagar:** Deletar tarefas (com caixa de confirmação).
* **Segurança:**
    * Rotas da API protegidas por middleware de autenticação.
    * Um usuário não pode ver, editar ou apagar as tarefas de outro usuário.

## 🚀 Tecnologias Utilizadas

### **Backend**
* **Node.js**
* **Express.js**
* **MongoDB** com **MongoDB Atlas**
* **Mongoose**
* **JSON Web Token (jsonwebtoken)**
* **bcrypt.js**
* **CORS**
* **Dotenv**

### **Frontend**
* **HTML5**
* **CSS3** (Flexbox, Variáveis CSS)
* **JavaScript (ES6+)** (Fetch API, Async/Await, Manipulação do DOM)

## 📦 Como Executar o Projeto Localmente

Siga os passos abaixo para rodar a aplicação na sua máquina.

### **Pré-requisitos**
* [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
* [MongoDB](https://www.mongodb.com/) (você pode usar uma instância local ou uma conta gratuita no MongoDB Atlas)

### **Backend**
```bash
# 1. Clone o repositório
git clone [https://github.com/Flaviabenegas/Projeto-ToDoList](https://github.com/Flaviabenegas/Projeto-ToDoList)

# 2. Navegue para a pasta do backend
cd /caminho/do/projeto/backend

# 3. Instale as dependências
npm install

# 4. Crie um arquivo .env na raiz do backend e adicione as seguintes variáveis:
MONGO_URI=sua_string_de_conexao_com_o_mongodb
JWT_SECRET=sua_chave_secreta_longa_e_aleatoria
PORT=3001

# 5. Inicie o servidor backend
npm run dev
```

### **Frontend**
Para o frontend, basta abrir os arquivos `.html` (`index.html`, `cadastro.html`, `tarefas.html`) diretamente no seu navegador. Para uma melhor experiência, recomenda-se usar a extensão **Live Server** do VS Code.

## 🛣️ Próximos Passos (Possíveis Melhorias)

* [ ] Migrar o frontend para um framework moderno como **React** ou **Vue.js**.
* [ ] Implementar o botão para mudar a senha do usuário.
* [ ] Implementar um sistema de notificações mais elegante (em vez de `alert()`).
* [ ] Adicionar indicadores de carregamento (spinners) durante as requisições à API.
* [ ] Fazer o deploy da aplicação em serviços como **Render** (backend) e **Netlify** (frontend).

### **Backend**
[![Node.JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Bcrypt.js](https://img.shields.io/badge/Bcrypt.js-62A8E5?style=for-the-badge)](https://github.com/kelektiv/bcrypt.js)
[![CORS](https://img.shields.io/badge/CORS-orange?style=for-the-badge)](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)
[![Dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge)](https://github.com/motdotla/dotenv)
[![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge)](https://nodemon.io/)

### **Frontend**
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

### **Ferramentas**
[![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)
[![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/)

