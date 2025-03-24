# eco-points-back

Eco Points - Backend
Este é o backend do projeto Eco Points, uma aplicação que gerencia pontos de usuários, usando o Supabase como banco de dados e Fastify como framework web.

Descrição
Este projeto fornece uma API para gerenciar usuários e seus pontos em um sistema baseado em Supabase. A API oferece rotas para criar, listar, atualizar e deletar usuários, com validação de dados e tratamento de erros.

Funcionalidades
Listar todos os usuários: Rota para buscar todos os usuários cadastrados no banco de dados.

Criar um novo usuário: Rota para cadastrar um novo usuário fornecendo nome e e-mail.

Buscar usuário por ID: Rota para buscar um usuário específico pelo seu ID.

Atualizar usuário: Rota para atualizar o nome e e-mail de um usuário existente.

Deletar usuário: Rota para deletar um usuário baseado no seu ID.

Tecnologias
Fastify: Framework para criação do servidor e das rotas.

Supabase: Banco de dados e serviço backend para gerenciar os dados dos usuários.

ESLint: Ferramenta de linting para garantir a qualidade do código.

Prettier: Ferramenta de formatação de código.

dotenv: Carregamento de variáveis de ambiente a partir do arquivo .env.

Configuração
Pré-requisitos
Node.js versão 16 ou superior

npm (gerenciador de pacotes do Node.js)

Conta no Supabase para criar a instância do banco de dados e obter as credenciais.

Passos para rodar o projeto
Clone o repositório:

git clone https://github.com/EdSillva/eco-points-back.git
cd eco-points-back

Instale as dependências:

Execute o comando para instalar todas as dependências do projeto:

npm install

Crie um arquivo .env na raiz do projeto:

O arquivo .env deve conter as seguintes variáveis de ambiente:

SUPABASE_URL=<sua_url_do_supabase>
SUPABASE_KEY=<sua_chave_de_aceesso_do_supabase>
PORT=3335

Inicie o servidor de desenvolvimento:

Para iniciar o servidor, use o seguinte comando:

npm run dev

O servidor estará disponível em http://localhost:3335.

Endpoints

GET /users
Retorna todos os usuários cadastrados.

POST /users
Cria um novo usuário com name e email.

Corpo da requisição:

{
"name": "Nome do Usuário",
"email": "email@dominio.com"
}

GET /users/:id
Retorna os dados de um usuário específico pelo ID.

PUT /users/:id
Atualiza os dados de um usuário com o ID especificado.

Corpo da requisição:

{
"name": "Novo Nome",
"email": "novoemail@dominio.com"
}

DELETE /users/:id
Deleta um usuário com o ID especificado.

Scripts
dev: Inicia o servidor em modo de desenvolvimento e observa as alterações nos arquivos. (Comando: npm run dev).

Configurações de Linting e Formatação

ESLint: Configurado para garantir que o código siga as boas práticas de JavaScript e o estilo definido pelo projeto.

Prettier: Utilizado para garantir que o código esteja formatado de maneira consistente.

Configurações do ESLint

Regras recomendadas para JavaScript e Prettier.

Suporte para variáveis globais do Node.js.

Sem ponto e vírgula no final das instruções.

Aspas duplas para strings.

2 espaços de indentação.

Configurações do Prettier

Aspas: Aspas duplas (") para strings.

Ponto e vírgula: Não usa ponto e vírgula ao final das declarações.

Tabulação: Usa 2 espaços para indentação.

Vírgula final: Adiciona vírgula final em objetos e arrays (onde permitido pelo ES5).

Contribuição

Faça o fork do repositório.

Crie uma branch para sua funcionalidade: git checkout -b minha-feature.

Faça as alterações e commit: git commit -m 'Adicionando nova funcionalidade'.

Envie para o repositório remoto: git push origin minha-feature.

Abra um Pull Request.

Licença

Este projeto está licenciado sob a Licença ISC.
