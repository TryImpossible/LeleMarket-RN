'use strict';

const path = require('path');
const { name } = require('./app.json');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * env 环境变量
 * https://www.webpackjs.com/guides/
 */
module.exports = (env) => {
  /// webpack --env.NODE_ENV=local --env.production --progress
  console.log('evn: ', env);
  return {
    mode: 'development', // "production" | "development" | "none"
    // bundle入口
    entry: [path.resolve(__dirname, 'index.js')],
    // bundle输出
    output: {
      path: path.resolve(__dirname, 'dist/web'),
      filename: '[name].web.bundle.js',
    },
    module: {
      // 关于模块配置
      rules: [
        {
          test: /\.ts(x?)$/,
          loader: 'ts-loader',
          // exclude: /node_modules/,
          include: /src/,
        },
        {
          test: /\.js$/,
          include: [
            path.join(__dirname, 'index.js'),
            path.resolve(__dirname, 'node_modules/react-native-gesture-handler'),
            path.resolve(__dirname, 'node_modules/react-native-screens'),
          ],
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              // Babel configuration (or use .babelrc)
              // This aliases 'react-native' to 'react-native-web' and includes only
              // the modules needed by the app.
              // plugins: [
              //   // This aliases 'react-native' to 'react-native-web' to fool modules that only know
              //   // about the former into some kind of compatibility.
              //   'react-native-web',
              // ],
              // The 'react-native' preset is recommended to match React Native's packager
              presets: ['module:metro-react-native-babel-preset'],
            },
          },
        },
        {
          test: /\.(gif|jpe?g|png|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        },
      ],
    },
    resolve: {
      // 解析模块请求的选项
      alias: {
        'react-native': 'react-native-web', // import时,react-native自动替换为react-native-web
        // ReactNativeART: 'react-art',
      },
      modules: ['node_modules', path.resolve(__dirname, 'src')],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
      contentBase: path.resolve(__dirname, 'dist/web'), // 本地服务器所加载的页面所在的目录
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
      new webpack.HotModuleReplacementPlugin(),
      // 自动清理bundle输出插件，dist/web文件夹
      new CleanWebpackPlugin(),
      // html模板插件
      new HtmlWebpackPlugin({
        title: name,
        template: path.resolve(__dirname, 'index.html'), // Load a custom template
        inject: 'body', // Inject all scripts into the body
      }),
    ],
  };
};
