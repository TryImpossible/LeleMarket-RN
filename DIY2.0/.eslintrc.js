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
    'no-undef': 'off',
    'no-useless-constructor': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'no-return-assign': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'import/no-unresolved': 0
  }
};
