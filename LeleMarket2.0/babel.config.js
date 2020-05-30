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
            rootPathSuffix: './src/modules',
            rootPathPrefix: 'modules',
          },
          {
            rootPathSuffix: './src/navigators',
            rootPathPrefix: 'navigators',
          },
          {
            rootPathSuffix: './src/resources',
            rootPathPrefix: 'resources/',
          },
          {
            rootPathSuffix: './src/screens',
            rootPathPrefix: 'screens',
          },
          {
            rootPathSuffix: './src/services',
            rootPathPrefix: 'services/',
          },
          {
            rootPathSuffix: './src/storage',
            rootPathPrefix: 'storage',
          },
          {
            rootPathSuffix: './src/utilities',
            rootPathPrefix: 'utilities',
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
