// Flat ESLint config for ESLint v9+
const js = require('@eslint/js')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const prettierPlugin = require('eslint-plugin-prettier')
const simpleImportSort = require('eslint-plugin-simple-import-sort')

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    files: ['src/**/*.{ts,js,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        require: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // side effect imports
            ['^\u0000'],
            // node builtins and external deps
            ['^node:(.*)$', '^@?\\w'],
            // config
            ['^@config(/.*)?$'],
            // dto
            ['^@dto(/.*)?$'],
            // modules
            ['^@modules(/.*)?$'],
            // utils and middleware and src catch-all
            ['^@utils(/.*)?$', '^@middleware(/.*)?$', '^@src(/.*)?$'],
            // relative imports
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
]
