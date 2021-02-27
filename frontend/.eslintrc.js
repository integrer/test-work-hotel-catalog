const extensions = ['.js', '.ts', '.vue', '.sass', '.scss', '.json'];

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:jsdoc/recommended',
    'prettier',
    'prettier/vue',
    'prettier/@typescript-eslint',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['vue', 'jsdoc', 'prettier', 'import', '@typescript-eslint'],
  ignorePatterns: ['node_modules/**', 'dist/**'],
  settings: {
    'import/extensions': extensions,
    'import/resolver': {
      alias: { extensions },
      node: { extensions },
      typescript: { alwaysTryTypes: true },
    },
  },
  rules: {
    'vue/max-attributes-per-line': 1,
    'object-curly-spacing': [2, 'always'],
    'comma-dangle': ['warn', 'always-multiline'],
    quotes: ['warn', 'single'],
  },
};
