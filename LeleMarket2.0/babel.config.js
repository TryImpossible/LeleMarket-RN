module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          { rootPathSuffix: './src', rootPathPrefix: 'src/' },
          {
            rootPathSuffix: './src/components',
            rootPathPrefix: 'components/',
          },
          {
            rootPathSuffix: './src/navigators',
            rootPathPrefix: 'navigators',
          },
          {
            rootPathSuffix: './src/screens',
            rootPathPrefix: 'screens',
          },
          {
            rootPathSuffix: './src/modules',
            rootPathPrefix: 'modules',
          },
          {
            rootPathSuffix: './src/utilities',
            rootPathPrefix: 'utilities/',
          },
        ],
      },
    ],
  ],
};
