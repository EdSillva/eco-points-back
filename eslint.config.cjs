const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  {
    files: ['src/**/*.ts'],
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'double'],
      'prettier/prettier': 'error', // Aplica as regras do Prettier como erros
    },
  },
  {
    files: ['*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      // Outras regras personalizadas para .ts e .tsx podem ser adicionadas aqui
    },
  },
];

