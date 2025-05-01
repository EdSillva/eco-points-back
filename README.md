# Eco Points - Backend

Este é o backend do projeto **Eco Points**, uma aplicação que gerencia pontos de usuários, usando o **Supabase** como banco de dados e **Fastify** como framework web.

## Descrição

Este projeto fornece uma API para gerenciar usuários e seus pontos em um sistema baseado em **Supabase**. A API oferece rotas para criar, listar, atualizar e deletar recompensas, com validação de dados e tratamento de erros.

## Funcionalidades

- **Listar todos as recompensas**: Rota para buscar todas as recompensas cadastradas no banco de dados.
- **Listar recompensas por categoria**: Rota para buscar recompensas por categoria.

## Tecnologias

- **[Fastify](https://www.fastify.io/)** – Framework web leve e performático.
- **[Supabase](https://supabase.com/)** – Backend-as-a-Service com banco de dados PostgreSQL.
- **[Firebase](https://firebase.google.com/)** – Autenticação de usuários.
- **ESLint**: Ferramenta de linting para garantir a qualidade do código.
- **Prettier**: Ferramenta de formatação de código.
- **dotenv**: Carregamento de variáveis de ambiente a partir do arquivo .env.

## ⚙️ Configuração

### ✅ Pré-requisitos

- **Node.js** versão 16 ou superior
- **npm** (gerenciador de pacotes do Node.js)
- **Conta no Supabase** para criar a instância do banco de dados e obter as credenciais.
- **Conta no Firebase** para configurar a autenticação.

## Firebase

Para usar o Firebase, crie um projeto na [Console do Firebase](https://console.firebase.google.com/), e pegue as credenciais para autenticação. Você precisará configurar o Firebase com um arquivo `firebaseConfig.js` ou definir as variáveis diretamente no .env, disponíveis no painel de configurações do Firebase.

### 🔧 Passos para rodar o projeto

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
SUPABASE_KEY=<sua_chave_de_acesso_do_supabase>
PORT=3335

FIREBASE_PROJECT_ID=<seu_id_do_projeto>
FIREBASE_CLIENT_EMAIL=<seu_email_do_firebase>
FIREBASE_PRIVATE_KEY=<su_chave_privada>
```

**Importante**: Não compartilhe o arquivo .env nem a chave do Supabase publicamente.

4. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

O servidor estará disponível em **http://localhost:3335**.

## Endpoints

### 🎁 Recompensas

#### **GET** /rewards

Retorna todas as recompensas cadastradas. Você pode filtrar por categoria usando o parâmetro de consulta (`query param`).

**Exemplo de requisição (sem filtro):**

```bash
 GET /rewards
```

**Resposta esperada:**

```json
[
  {
    "id": 1,
    "name": "Desconto em Restaurante",
    "description": "10% de desconto no Restaurante X",
    "category": "alimentação",
    "points": 100,
    "partner_name": "Restaurante X"
  },
  {
    "id": 2,
    "name": "Desconto em Curso",
    "description": "20% de desconto no curso X",
    "category": "educação",
    "points": 200,
    "partner_name": "Curso X"
  }
]
```

**Exemplo com filtro por categoria:**

```bash
 GET /rewards?category=alimentação
```

**Resposta esperada:**

```json
[
  {
    "id": 1,
    "name": "Desconto em Restaurante",
    "description": "10% de desconto no Restaurante X",
    "category": "alimentação",
    "points": 100,
    "partner_name": "Restaurante X"
  }
]
```

## Scripts

- `dev`: Inicia o servidor em modo de desenvolvimento e observa as alterações nos arquivos.
- `lint`: Verifica problemas de lint no código.
- `lint:fix`: Corrige automaticamente problemas de lint possíveis.

## Configurações de Linting e Formatação

- **ESLint**: Configurado para garantir que o código siga as boas práticas de JavaScript e o estilo definido pelo projeto.
- **Prettier**: Utilizado para garantir que o código esteja formatado de maneira consistente.

### **Configurações do ESLint**

- Regras recomendadas para TypeScript e Prettier.
- Ponto e vírgula no final das instruções.
- Aspas duplas para strings.
- Integração do ESLint com o Prettier.

### **Configurações do Prettier**

- **Aspas**: Aspas duplas (`""`) para strings.
- **Ponto e vírgula**: Usa ponto e vírgula ao final das declarações.
- **Tabulação**: Usa 2 espaços para indentação.
- **Vírgula final**: Adiciona vírgula final em objetos e arrays (onde permitido pelo ES5).
- **Parênteses**: Adicionar parênteses em torno dos parâmetros de funções de seta (arrow functions).
- **Largura**: 80 caracteres é a largura máxima de linha que o Prettier vai tentar manter.

## Melhorias

- ✅ **Migração completa para TypeScript**: Todos os arquivos `.js` foram convertidos para `.ts`, aproveitando os recursos de tipagem estática.
- ✅ **ESLint configurado para TypeScript**: Linting configurado com `@typescript-eslint`, seguindo padrões de qualidade com regras como:
  - Uso de ponto e vírgula (`semi: always`)
  - Aspas duplas para strings (`quotes: double`)
- ✅ **Integração com Prettier**: Garantia de formatação consistente via Prettier, com integração no pipeline do ESLint (`eslint --fix` já aplica as formatações).
- ✅ **Scripts de linting adicionados**:
  - `npm run lint`: verifica problemas de lint no código.
  - `npm run lint:fix`: corrige automaticamente os problemas possíveis.
