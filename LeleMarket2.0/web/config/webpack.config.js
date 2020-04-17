'use strict';

const path = require('path');
const { name } = require('../../app.json');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../../');

// const tsLoaderConfiguration = {
//   test: /\.ts(x?)$/,
//   loader: 'ts-loader',
//   // exclude: /node_modules/,
//   include: /src/,
// };

const tsLoaderConfiguration = {
  test: /\.ts(x?)$/,
  include: [
    path.join(appDirectory, 'index.web.js'),
    path.join(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-native-gesture-handler'),
    path.resolve(appDirectory, 'node_modules/react-native-screens'),
    path.resolve(appDirectory, 'node_modules/react-navigation-stack'),
    path.resolve(appDirectory, 'node_modules/@react-navigation'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // Babel configuration (or use .babelrc)
      // The 'react-native' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset'],
      // This aliases 'react-native' to 'react-native-web' and includes only
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web'],
    },
  },
};

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.js$/,
  include: [
    path.join(appDirectory, 'index.web.js'),
    path.join(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-native-gesture-handler'),
    path.resolve(appDirectory, 'node_modules/react-native-screens'),
    path.resolve(appDirectory, 'node_modules/react-navigation-stack'),
    path.resolve(appDirectory, 'node_modules/@react-navigation'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // Babel configuration (or use .babelrc)
      // The 'react-native' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset'],
      // This aliases 'react-native' to 'react-native-web' and includes only
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web'],
    },
  },
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

/**
 * env 环境变量
 * https://www.webpackjs.com/guides/
 */
module.exports = (env) => {
  /// webpack --env.NODE_ENV=local --env.production --progress
  return {
    mode: 'development', // "production" | "development" | "none"
    // bundle入口
    entry: [path.resolve(appDirectory, 'index.web.js')],
    // bundle输出
    output: {
      publicPath: '',
      path: path.resolve(appDirectory, 'dist/web'),
      filename: '[name].web.bundle.js',
    },
    module: {
      // 关于模块配置
      rules: [tsLoaderConfiguration, babelLoaderConfiguration, imageLoaderConfiguration],
    },
    // 解析模块请求的选项
    resolve: {
      // This will only alias the exact import "react-native"
      alias: {
        'react-native$': 'react-native-web', // 使RN代码中import自react-native的组件指向了react-native-web
        // ReactNativeART: 'react-art',
      },
      // modules: ['web_modules', 'node_modules'],
      extensions: ['.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js', '.web.jsx', '.jsx'],
    },
    // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
    // 牺牲了构建速度的 `source-map' 是最详细的。
    devtool: 'source-map',
    stats: 'errors-only',
    target: 'web',
    // 开发服务器
    devServer: {
      host: '127.0.0.1', // ip
      port: 3000, // 端口
      contentBase: path.resolve(appDirectory, 'dist/web'), // 本地服务器所加载的页面所在的目录
      historyApiFallback: true, //不跳转
      inline: true, // 实时刷新
      hot: true, // 热加载
      // hotOnly: true,
      compress: true,
      // useLocalIp: true, // 使用本地ip
      open: false, // 是否自动打开
    },
    // 附加插件列表
    plugins: [
      // 热加载插件
      new webpack.NamedModulesPlugin(),
      // 自动清理bundle输出插件，dist/web文件夹
      new CleanWebpackPlugin(),
      // html模板插件
      new HtmlWebpackPlugin({
        title: name,
        template: path.resolve(appDirectory, 'web/public/index.html'), // Load a custom template
        inject: 'body', // Inject all scripts into the body
        favicon: './',
      }),
      // 注入全局变量
      new webpack.DefinePlugin({
        SERVER_URL: '123',
        PUBLIC_URL: './',
      }),
    ],
  };
};
