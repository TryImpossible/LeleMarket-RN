'use strict';

const webpack = require('webpack');
const path = require('path');
const appDirectory = path.resolve(__dirname, '../../');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  //需要打包的第三方库
  entry: {
    vendor: ['react', 'react-dom', 'react-native-web'],
  },
  // devtool: 'source-map',
  output: {
    filename: '[name].dll.js',
    path: path.resolve(appDirectory, 'dist/web/dll'),
    library: '[name]_[hash:10]', // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 打包生成一个manifest.json 映射
    new webpack.DllPlugin({
      name: '[name]_[hash:10]', //映射库暴露出的名称
      path: path.resolve(appDirectory, 'dist/web/dll/[name]-manifest.json'), //文件地址
    }),
  ],
  mode: 'development',
};
