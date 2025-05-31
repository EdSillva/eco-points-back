# Eco Points - Backend

Este é o backend do projeto **Eco Points**, uma aplicação que gerencia pontos de usuários, usando o **Supabase** como banco de dados e **Fastify** como framework web.

## Descrição

Este projeto fornece uma API para gerenciar usuários e seus pontos em um sistema baseado em **Supabase**. A API oferece rotas para listar recompensas e recompensas resgatadas, com validação de dados e tratamento de erros.

## Funcionalidades

- **Listar todos as recompensas**: Rota para buscar todas as recompensas cadastradas no banco de dados.
- **Listar recompensas por categoria**: Rota para buscar recompensas por categoria.
- **Listar recompensas resgatadas**: Rota para buscar recompensas regatadas pelo usuário autenticado.

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

Retorna todas as recompensas cadastradas. Você pode filtrar por nome usando o parâmetro de consulta (`query param`).

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
 GET /rewards?name=Ingresso%20para%20Cinema
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

### ✅ Recompensas Resgatadas

#### **GET** /redeemed-rewards

Retorna a lista de recompensas que o usuário autenticado já resgatou.

**Autenticação Firebase obrigatória** via token no cabeçalho `Authorization`.

**Exemplo de requisição:**

```bash
 GET /redeemed-rewards
```

**Exemplo de cabeçalho:**

```http
Authorization: Bearer <ID_TOKEN>
```

**Resposta esperada:**

```json
[
  {
    "reward": {
      "reward_name": "Ingresso para Cinema"
    },
    "redeemed_at": "2024-05-11T15:23:00.000Z"
  }
]
```

### 🌱 Ações Sustentáveis

#### **POST** /sustainable-actions

Cria uma nova ação sustentável para o usuário autenticado.

**Autenticação Firebase obrigatória** via token no cabeçalho `Authorization`.

**Corpo da requisição:**

```json
{
  "title": "Plantio de árvore",
  "description": "Plantei uma árvore no parque da cidade.",
  "points": 50
}
```

**Exemplo de cabeçalho:**

```http
Authorization: Bearer <ID_TOKEN>
```

**Resposta esperada:**

```json
{
  "message": "Ação sustentável registrada com sucesso.",
  "action": {
    "id": "uuid",
    "title": "Plantio de árvore",
    "description": "Plantei uma árvore no parque da cidade.",
    "points": 50,
    "user_id": "uid",
    "created_at": "2025-05-30T14:22:00.000Z"
  }
}
```

#### **GET** /sustainable-actions

Retorna todas as ações sustentáveis registradas pelo usuário autenticado.

**Autenticação Firebase obrigatória** via token no cabeçalho `Authorization`.

**Exemplo de requisição:**

```bash
 GET /sustainable-actions
```

**Resposta esperada:**

```json
[
  {
    "id": "uuid",
    "title": "Plantio de árvore",
    "description": "Plantei uma árvore no parque da cidade.",
    "points": 50,
    "user_id": "uid",
    "created_at": "2025-05-30T14:22:00.000Z"
  }
]
```

#### **PUT** /sustainable-actions/:id

Atualiza uma ação sustentável específica do usuário autenticado.

**Autenticação Firebase obrigatória** via token no cabeçalho `Authorization`.

**Parâmetro de rota:**

```bash
 id: UUID da ação sustentável
```

**Corpo da requisição:**

```json
{
  "title": "Plantio de árvores nativas",
  "description": "Plantei 3 árvores nativas em área de reflorestamento.",
  "points": 70
}
```

**Resposta esperada:**

```json
{
  "message": "Ação sustentável atualizada com sucesso.",
  "action": {
    "id": "uuid",
    "title": "Plantio de árvores nativas",
    "description": "Plantei 3 árvores nativas em área de reflorestamento.",
    "points": 70,
    "user_id": "uid",
    "created_at": "2025-05-30T14:22:00.000Z"
  }
}
```

#### **DELETE** /sustainable-actions/:id

Deleta uma ação sustentável específica do usuário autenticado.

**Autenticação Firebase obrigatória** via token no cabeçalho `Authorization`.

**Parâmetro de rota:**

```bash
 id: UUID da ação sustentável
```

**Exemplo de requisição:**

```bash
 DELETE /sustainable-actions/6d6c1e9e-34cd-4a8f-a837-519e44529d08
```

**Resposta esperada:**

```json
{
  "message": "Ação sustentável deletada com sucesso."
}
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
- **Quebra de Linha**: "lf": Usa quebras de linha no estilo Unix (\n). 

## Melhorias

- ✅ **Migração completa para TypeScript**: Todos os arquivos `.js` foram convertidos para `.ts`, aproveitando os recursos de tipagem estática.
- ✅ **ESLint configurado para TypeScript**: Linting configurado com `@typescript-eslint`, seguindo padrões de qualidade com regras como:
  - Uso de ponto e vírgula (`semi: always`)
  - Aspas duplas para strings (`quotes: double`)
- ✅ **Integração com Prettier**: Garantia de formatação consistente via Prettier, com integração no pipeline do ESLint (`eslint --fix` já aplica as formatações).
- ✅ **Scripts de linting adicionados**:
  - `npm run lint`: verifica problemas de lint no código.
  - `npm run lint:fix`: corrige automaticamente os problemas possíveis.
