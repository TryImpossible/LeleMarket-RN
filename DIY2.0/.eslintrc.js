module.exports = {
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  plugins: ['react', 'prettier'],
  settings: {
    'import/parser': 'babel-eslint',
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src']
      }
    }
  },
  globals: {
    __DEV__: true,
    fetch: true
  },
  rules: {
    // Allow .js files to use JSX syntax
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    // https://eslint.org/docs/rules/no-console
    'no-console': ['error'],
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    // ESLint plugin for prettier formatting
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier/prettier': 'error',
    // https://eslint.org/docs/rules/no-param-reassign
    'no-param-reassign': 'warn',
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
    'react/require-default-props': ['off', { forbidDefaultForRequired: false }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md
    'react/forbid-prop-types': [
      'error',
      {
        forbid: [],
        checkContextTypes: false,
        checkChildContextTypes: false
      }
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
