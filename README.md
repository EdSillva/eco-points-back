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
- **dotenv**: Carregamento de variáveis de ambiente a partir do arquivo `.env`.

## Configuração

### Pré-requisitos

- **Node.js** versão 16 ou superior
- **npm** (gerenciador de pacotes do Node.js)
- **Conta no Supabase** para criar a instância do banco de dados e obter as credenciais.

### Passos para rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/EdSillva/eco-points-back.git
   cd eco-points-back

