# Eco Points - Backend

Este é o backend do projeto **Eco Points**, uma aplicação que gerencia pontos de usuários, usando o **Supabase** como banco de dados e **Fastify** como framework web.

## Descrição

Este projeto fornece uma API para gerenciar usuários e seus pontos em um sistema baseado em **Supabase**. A API oferece rotas para criar, listar, atualizar e deletar usuários, com validação de dados e tratamento de erros.

## Funcionalidades

- **Listar todos os usuários**: Rota para buscar todos os usuários cadastrados no banco de dados.
- **Criar um novo usuário**: Rota para cadastrar um novo usuário fornecendo nome e e-mail.
- **Buscar usuário por ID**: Rota para buscar um usuário específico pelo seu ID.
- **Atualizar usuário**: Rota para atualizar o nome e e-mail de um usuário existente.
- **Deletar usuário**: Rota para deletar um usuário baseado no seu ID.

## Tecnologias

- **Fastify**: Framework para criação do servidor e das rotas.
- **Supabase**: Banco de dados e serviço backend para gerenciar os dados dos usuários.
- **ESLint**: Ferramenta de linting para garantir a qualidade do código.
- **Prettier**: Ferramenta de formatação de código.
- **dotenv**: Carregamento de variáveis de ambiente a partir do arquivo .env.
- **Firebase**: Utilizado para autenticação de usuários no sistema.

## Configuração

### Pré-requisitos

- **Node.js** versão 16 ou superior
- **npm** (gerenciador de pacotes do Node.js)
- **Conta no Supabase** para criar a instância do banco de dados e obter as credenciais.
- **Conta no Firebase** para gerar as credenciais de autenticação.

## Firebase

   Para usar o Firebase, crie um projeto na [Console do Firebase](https://console.firebase.google.com/), e pegue as credenciais para autenticação. Você precisará do arquivo `firebaseConfig.js` com a configuração do Firebase, ou pode pegar as variáveis diretamente no painel de configurações do Firebase.

### Passos para rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/EdSillva/eco-points-back.git
   cd eco-points-back
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Crie um arquivo .env na raiz do projeto:**
   O arquivo .env deve conter as seguintes variáveis de ambiente:

   ```env
   SUPABASE_URL=<sua_url_do_supabase>
   SUPABASE_KEY=<sua_chave_de_aceesso_do_supabase>
   PORT=3335

   FIREBASE_API_KEY=COLAR_AQUI
   FIREBASE_AUTH_DOMAIN=COLAR_AQUI
   FIREBASE_PROJECT_ID=COLAR_AQUI
   FIREBASE_STORAGE_BUCKET=COLAR_AQUI
   FIREBASE_MESSAGING_SENDER_ID=COLAR_AQUI
   FIREBASE_APP_ID=COLAR_AQUI
   ```

   **Importante**: Não compartilhe o arquivo .env nem a chave do Supabase publicamente.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   O servidor estará disponível em **http://localhost:3335**.

## Endpoints

### **GET** /users

Retorna todos os usuários cadastrados.

### **POST** /users

Criar um novo usuário com `name` e `email`.

**Corpo da requisição:**

```json
{
  "name": "Nome do Usuário",
  "email": "email@dominio.com"
}
```

### **GET** /users/:id

Retorna os dados de um usuário específico pelo ID.

### **PUT** /users/:id

Atualiza os dados de um usuário com o ID especificado.

**Corpo da requisição:**

```json
{
  "name": "Novo Nome",
  "email": "novoemail@dominio.com"
}
```

### **DELETE** /users/:id

Deleta um usuário com o ID especificado.

### POST /signup

Cria um novo usuário com email e senha.

**Exemplo de requisição:**

```json
{
  "email": "teste@email.com",
  "password": "123456"
}
```

**Resposta esperada (201 - Criado com sucesso):**

```json
{
  "message": "Usuário criado com sucesso!",
  "user": {
    "uid": "ExemploDeUID",
    "email": "teste@email.com"
  }
}
```
### POST /login

Realiza o login de um usuário com email e senha.

**Exemplo de requisição:**

```json
{
  "email": "teste@email.com",
  "password": "123456"
}
```
**Resposta esperada (200 - Login bem-sucedido):**

```json
{
  "message": "Usuário logado com sucesso!",
  "user": {
    "uid": "ExemploDeUID",
    "email": "teste@email.com"
  }
}
```
### POST /logout 

Desloga o usuário atual.

**Resposta esperada (200 - Logout bem-sucedido):**

```json
{
  "message": "Usuário deslogado com sucesso!"
}
```

## Scripts

- **dev**: Inicia o servidor em modo de desenvolvimento e observa as alterações nos arquivos. (Comando: `npm run dev`).

## Configurações de Linting e Formatação

- **ESLint**: Configurado para garantir que o código siga as boas práticas de JavaScript e o estilo definido pelo projeto.
- **Prettier**: Utilizado para garantir que o código esteja formatado de maneira consistente.

### **Configurações do ESLint**

- Regras recomendadas para JavaScript e Prettier.
- Suporte para variáveis globais do Node.js.
- Sem ponto e vírgula no final das instruções.
- Aspas duplas para strings.
- 2 espaços de indentação.

### **Configurações do Prettier**

- **Aspas**: Aspas simples (`''`) para strings.
- **Ponto e vírgula**: Usa ponto e vírgula ao final das declarações.
- **Tabulação**: Usa 2 espaços para indentação.
- **Vírgula final**: Adiciona vírgula final em objetos e arrays (onde permitido pelo ES5).