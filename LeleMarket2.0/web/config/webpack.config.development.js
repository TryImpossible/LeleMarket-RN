'use strict';

const webpack = require('webpack');
const { smart } = require('webpack-merge');

const base = require('./webpack.config.base.js');
const getClientEnvironment = require('./env'); // 读取环境变量

module.exports = smart(base, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    // 注入全局变量
    new webpack.DefinePlugin(getClientEnvironment('.env.development')),
  ],
});
