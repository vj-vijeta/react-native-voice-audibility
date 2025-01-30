module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  env: {
    node: true, // Enables `module`, `exports`, `require`, `console`
    es6: true, // Enables ES6 features
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Ignore unused vars prefixed with "_"
    '@typescript-eslint/no-non-null-assertion': 'off', // Allow non-null assertions
    '@typescript-eslint/no-var-requires': 'off', // Allow require() statements
    'react-hooks/exhaustive-deps': 'off', // Disable the warning
    // 'react-hooks/exhaustive-deps': 'warn', // Warn instead of error for useEffect dependencies
  },
};
