//O defineConfig é utilizado para criar um arquivo de configuração para o ESLint de forma mais organizada.
import { defineConfig } from "eslint/config";
import globals from "globals";
//O plugin @eslint/js é utilizado para habilitar as regras recomendadas do ESLint para JavaScript.
import js from "@eslint/js";

export default defineConfig([
  //O files é usado para especificar quais tipos de arquivos serão analisados, 
  //nesse caso, todos os arquivos com extensões .js, .mjs e .cjs.
  { files: ["**/*.{js,mjs,cjs}"] },
  //A configuração globals: globals.node define as variáveis globais do Node.js 
  //para que o ESLint saiba que pode usar essas variáveis (como require, module, etc.) sem gerar erros.
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    //O extends: ["js/recommended", "prettier"] configura o ESLint para seguir as recomendações padrão para 
    //JavaScript e também aplicar as regras do Prettier para garantir que o código esteja formatado corretamente 
    //de acordo com o estilo definido
    extends: ["js/recommended", "prettier"],
  },
]);
