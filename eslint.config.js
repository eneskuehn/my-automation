import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginPlaywright from 'eslint-plugin-playwright';

export default [
  {
    ignores: ['node_modules/**'],
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser, 
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'playwright': eslintPluginPlaywright
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-page-pause': 'warn',
      'playwright/no-wait-for-selector': 'warn'
    }
  }
];
