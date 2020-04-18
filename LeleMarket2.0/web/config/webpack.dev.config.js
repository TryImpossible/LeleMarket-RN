'use strict';

const path = require('path');
const { smart } = require('webpack-merge');
const base = require('./webpack.base.config.js');
const Dotenv = require('dotenv-webpack'); // 注入全局变量插件

const appDirectory = path.resolve(__dirname, '../../');

module.exports = smart(base, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    // 注入全局变量
    new Dotenv({
      path: path.resolve(appDirectory, '.env.development'),
      expand: true,
      defaults: path.resolve(appDirectory, '.env'),
    }),
  ],
});
