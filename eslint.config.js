// @ts-check
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import { flatConfigs as importPlugin } from 'eslint-plugin-import';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const commonRules = {
    'no-prototype-builtins': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'react/jsx-filename-extension': [
        1,
        {
            extensions: ['.jsx', '.tsx'],
        },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/imports-first': ['error', 'absolute-first'],
    'react/prop-types': 0,
    'react/require-default-props': 0,
    semi: ['error', 'always'],
    'import/no-extraneous-dependencies': [
        'error',
        {
            devDependencies: [
                '/*.test.js',
                '/*.tests.js',
                '/*.stories.js',
                'src/setupTests.js',
                '.storybook//*.js',
                '**/*.stories.*',
            ],
        },
    ],
    'no-param-reassign': [
        'error',
        { props: true, ignorePropertyModificationsFor: ['draft'] },
    ],
    'import/extensions': [
        'error',
        'ignorePackages',
        {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
        },
    ],
    'react/function-component-definition': [
        2,
        {
            namedComponents: 'arrow-function',
        },
    ],
    'react/jsx-no-useless-fragment': [
        'error',
        {
            allowExpressions: true,
        },
    ],
    '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: ['return', 'block-like'] },
        { blankLine: 'always', prev: ['block-like'], next: '*' },
    ],
    'no-console': 'warn',
    'no-alert': 'warn',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'react/display-name': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
        'error',
        {
            args: 'after-used',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
        },
    ],
    'react/no-array-index-key': 'error',
};

export default tseslint.config(
  {
      ignores: ['dist', 'vite.config.ts', 'workbox-config.js'],
  },
  {
      extends: [
          js.configs.recommended,
          tseslint.configs.recommended,
          importPlugin.recommended,
          importPlugin.typescript,
          reactPlugin.configs.flat.recommended,
          reactPlugin.configs.flat['jsx-runtime'],
          prettierRecommended,
          prettierConfig,
      ],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
          ecmaVersion: 2021,
          globals: globals.browser,
          sourceType: 'module',
      },
      plugins: {
          'react-hooks': reactHooks,
          'react-refresh': reactRefresh,
      },
      settings: {
          react: {
              version: 'detect',
          },
          'import/resolver': {
              node: {
                  paths: ['src'],
                  extensions: ['.js', '.jsx', '.ts', '.tsx'],
                  typescript: true,
                  node: true,
              },
              typescript: {
                  alwaysTryTypes: true,
                  project: './tsconfig.json',
              },
          },
      },
      // @ts-ignore
      rules: {
          ...reactHooks.configs.recommended.rules,
          ...commonRules,
      },
  },
);
