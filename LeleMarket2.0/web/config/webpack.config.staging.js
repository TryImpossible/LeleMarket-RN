'use strict';

const path = require('path');
const appDirectory = path.resolve(__dirname, '../../');

const { smart } = require('webpack-merge');
const base = require('./webpack.config.base.js');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin'); // 压缩js插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css插件
const getClientEnvironment = require('./env'); // 读取环境变量

const commonCssUse = [
  // 'style-loader',
  // 这个loader取代style-loader。作用：提取js中的css成单独文件
  MiniCssExtractPlugin.loader,
  // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
  'css-loader',
  //帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
  {
    // 使用loader的默认配置
    // 'postcss-loader',
    // 修改loader的配置
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        // postcss 的插件
        require('postcss-preset-env')(),
      ],
    },
  },
];

const cssLoaderConfiguration = {
  //匹配以.css结尾的文件
  test: /\.css$/,
  // use数组中loader执行顺序：从右到左，从下到上 依次执行
  use: [...commonCssUse],
};

const lessLoaderConfiguration = {
  //匹配以.less结尾的文件
  test: /\.less$/,
  use: [
    ...commonCssUse,
    // 将less文件编译成css文件
    'less-loader',
  ],
};

module.exports = smart(base, {
  mode: 'production',
  devtool: 'source-map',
  // 压缩 model 必须是production才有效果
  optimization: {
    minimizer: [
      new UglifyjsPlugin({
        // 使用缓存
        cache: true,
      }),
    ],
  },
  module: {
    // 关于模块配置
    rules: [cssLoaderConfiguration, lessLoaderConfiguration],
  },
  plugins: [
    new MiniCssExtractPlugin({
      //对输出的css文件进行文件夹配置和重命名
      filename: 'css/bundle.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    // 注入全局变量
    new webpack.DefinePlugin(getClientEnvironment('.env.staging')),
  ],
});
