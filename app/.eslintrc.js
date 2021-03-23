module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-import-helpers'],
  rules: {
    'prettier/prettier': 'error',
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'no-shadow': 'off',

    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'error',
    'import/extensions': [
      'error',
      {
        extension: ['.ts', '.js'],
      },
    ],

    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],

    'import-helpers/order-imports': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
        newlinesBetween: 'never',
        groups: [
          '/^react$/',
          '/^@nest/',
          'module',
          '/^@shared/',
          '/^@modules/',
          ['parent', 'sibling'],
          'index',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['./app/tsconfig.json'],
        extension: ['.ts', '.js'],
      },
    },
    typescript: {},
  },
};
