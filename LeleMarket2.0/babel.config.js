module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // [
    //   'babel-plugin-root-import',
    //   {
    //     paths: [
    //       { rootPathSuffix: './src', rootPathPrefix: '@src/' },
    //       {
    //         rootPathSuffix: './src/components',
    //         rootPathPrefix: '@components',
    //       },
    //       {
    //         rootPathSuffix: './src/navigators',
    //         rootPathPrefix: '@navigators',
    //       },
    //       {
    //         rootPathSuffix: './src/navigators',
    //         rootPathPrefix: '@navigators/',
    //       },
    //       {
    //         rootPathSuffix: './src/resources',
    //         rootPathPrefix: '@resources/',
    //       },
    //       {
    //         rootPathSuffix: './src/screens',
    //         rootPathPrefix: '@screens',
    //       },
    //       {
    //         rootPathSuffix: './src/services',
    //         rootPathPrefix: '@services/',
    //       },
    //       {
    //         rootPathSuffix: './src/utilities',
    //         rootPathPrefix: '@utilities',
    //       },
    //       {
    //         rootPathSuffix: './src/utilities',
    //         rootPathPrefix: '@utilities/',
    //       },
    //     ],
    //   },
    // ],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          '@src': './src',
          '@components': './src/components',
          '@navigators': './src/navigators',
          '@resources': './src/resources',
          '@screens': './src/screens',
          '@services': './src/services',
          '@utilities': './src/utilities',
        },
      },
    ],
  ],
};
