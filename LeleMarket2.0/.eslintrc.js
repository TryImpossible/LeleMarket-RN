module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  globals: {
    window: true,
    fetch: true,
    FormData: true,
    __DEV__: true,
    __ANDROID__: true,
    __IOS__: true,
    __IPHONEX__: true,
    __WEB__: true,
    __WIDTH__: true,
    __HEIGHT__: true,
    __ONEPX__: true,
    _toDP: true,
    _toSP: true,
    _c: true,
    requestAnimationFrame: true,
    navigator: true,
    alert: true,
  },
  rules: {
    // 禁止使用 var
    'no-var': 'error',
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    // https://github.com/typescript-eslint/typescript-eslint/blob/v2.28.0/packages/eslint-plugin/docs/rules/no-unused-vars.md
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};
