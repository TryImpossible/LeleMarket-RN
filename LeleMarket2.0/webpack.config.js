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
    mode: 'development',
    devtool: 'source-map',
    resolve: {
      // 必须配置，不然打包失败
      alias: {
        'react-native': 'react-native-web',
        ReactNativeART: 'react-art',
      },
      modules: ['web_modules', 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    // bundle入口
    entry: [path.resolve(__dirname, 'index.js')],
    // bundle输出
    output: {
      path: path.resolve(__dirname, 'dist/web'),
      filename: '[name].bundle.js',
    },
    // 开发服务器
    devServer: {
      host: '127.0.0.1', // ip
      port: 3000, // 端口
      contentBase: path.resolve(__dirname, 'dist/web'), // 本地服务器所加载的页面所在的目录
      historyApiFallback: true, //不跳转
      inline: true, // 实时刷新
      hot: true, // 热加载
      // hotOnly: true,
      useLocalIp: true, // 使用本地ip
      open: false, // 是否自动打开
    },
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
    module: {
      rules: [
        // 过滤打包的文件夹
        {
          test: /\.ts(x?)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
          // include: /src/
        },
      ],
    },
  };
};
