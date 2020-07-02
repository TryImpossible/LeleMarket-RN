'use strict';

const path = require('path');
const { name } = require('../../app.json');
const appDirectory = path.resolve(__dirname, '../../');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cssLoaderConfiguration = {
  //匹配以.css结尾的文件
  test: /\.css$/,
  // use数组中loader执行顺序：从右到左，从下到上 依次执行
  use: [
    // 创建style标签，将js中的样式资源插入进行，添加到head中生效
    'style-loader',
    // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
    'css-loader',
  ],
};

const lessLoaderConfiguration = {
  //匹配以.less结尾的文件
  test: /\.less$/,
  use: [
    // 创建style标签，将js中的样式资源插入进行，添加到head中生效
    'style-loader',
    // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
    'css-loader',
    // 将less文件编译成css文件
    'less-loader',
  ],
};

const tsLoaderConfiguration = {
  test: /\.ts(x?)$/,
  include: [path.join(appDirectory, 'src')],
  // exclude: /node_modules/,
  use: [
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        // 指定特定的ts编译配置，为了区分脚本的ts配置
        configFile: path.join(appDirectory, './tsconfig.json'),
      },
    },
    'thread-loader',
    {
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
  ],
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
    path.resolve(appDirectory, 'node_modules/react-navigation-tabs'),
    path.resolve(appDirectory, 'node_modules/react-native-reanimated'),
    path.resolve(appDirectory, 'node_modules/react-native-device-info'),
    path.resolve(appDirectory, 'node_modules/react-native-snap-carousel'),
  ],
  use: [
    'thread-loader',
    {
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
  ],
};

// This is needed for webpack to import static images in JavaScript files.
const urlLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    // 使用url-loader
    loader: 'url-loader',
    options: {
      // 图片大小小于8kb，就会被base64处理
      // 优点: 减少请求数量（减轻服务器压力）
      // 缺点：图片体积会更大（文件请求速度更慢）
      limit: 8 * 1024,
      // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
      // 解析时会出问题：[object Module]
      // 解决：关闭url-loader的es6模块化，使用commonjs解析
      esModule: false,
      // 给图片进行重命名
      // [hash:10]取图片的hash的前10位
      // [ext]取文件原来扩展名
      name: '[hash:10].[ext]',
      // outputPath: 'imgs', //图片输出增加imgs文件夹
    },
  },
};

//处理其它资源
const fileLoaderConfiguration = {
  //exclude排除法 后期手动添加
  exclude: /\.(css|js|jsx|ts|tsx|html|less|png|jpg|jpeg|gif|svg|json)$/,
  //使用file-loader
  loader: 'file-loader',
  options: {
    name: '[hash:10].[ext]',
    //其它文件增加输出文件夹
    // outputPath: 'media',
  },
};

const htmlLoaderConfiguration = {
  // 匹配.html结尾的文件
  test: /\.html$/,
  // 去除模板文件
  exclude: [path.resolve(appDirectory, 'web/public/index.html')],
  // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
  loader: 'html-loader',
  options: {
    minimize: true,
  },
};

const devServerConfiguration = {
  host: '0.0.0.0', // ip
  port: 3000, // 端口
  contentBase: path.resolve(appDirectory, 'public'), // 本地服务器所加载的页面所在的目录
  historyApiFallback: true, //不跳转
  inline: true, // 实时刷新
  hot: true, // 热加载
  // hotOnly: true,
  compress: true, // 是否启用压缩
  useLocalIp: true, // 使用本地ip
  open: false, // 是否自动打开
  publicPath: '', // 表示的是打包生成的静态文件所在的位置（若是devServer里面的publicPath没有设置，则会认为是output里面设置的publicPath的值）
  proxy: {
    '/api': {
      target: 'https://api.51app.cn',
      ws: true,
      changeOrigin: true,
      // secure: false,
      pathRewrite: {
        '^/api': '',
      },
    },
  }, // 配置跨域
};

/**
 * env 环境变量
 * https://www.webpackjs.com/guides/
 */

/// webpack --env.NODE_ENV=local --env.production --progress
module.exports = {
  mode: 'development', // "production" | "development" | "none"
  // bundle入口
  entry: [path.resolve(appDirectory, 'index.web.js')],
  // bundle输出
  output: {
    publicPath: '', // 表示的是打包生成的index.html文件里面引用资源的前缀
    path: path.resolve(appDirectory, 'dist/web/static'),
    filename: '[name].bundle.js',
  },
  module: {
    // 关于模块配置
    rules: [
      cssLoaderConfiguration,
      lessLoaderConfiguration,
      tsLoaderConfiguration,
      babelLoaderConfiguration,
      urlLoaderConfiguration,
      fileLoaderConfiguration,
      htmlLoaderConfiguration,
    ],
  },
  // 解析模块请求的选项
  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web', // 使RN代码中import自react-native的组件指向了react-native-web
      'src/': path.resolve(appDirectory, 'src/'),
      'components/': path.resolve(appDirectory, 'src/components/'),
      modules: path.resolve(appDirectory, 'src/modules'),
      navigators: path.resolve(appDirectory, 'src/navigators'),
      'resources/': path.resolve(appDirectory, 'src/resources/'),
      screens: path.resolve(appDirectory, 'src/screens'),
      'services/': path.resolve(appDirectory, 'src/services/'),
      storage: path.resolve(appDirectory, 'src/storage'),
      utilities: path.resolve(appDirectory, 'src/utilities'),
      'utilities/': path.resolve(appDirectory, './src/utilities/'),
    },
    // modules: ['web_modules', 'node_modules'],
    extensions: ['.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js', '.web.jsx', '.jsx'],
  },
  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  // 牺牲了构建速度的 `source-map' 是最详细的。
  devtool: 'eval-source-map',
  stats: 'errors-only',
  target: 'web',
  // 开发服务器
  devServer: devServerConfiguration,
  // 附加插件列表
  plugins: [
    // 热加载插件
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // 自动清理bundle输出插件，dist/web/static文件夹
    new CleanWebpackPlugin(),
    // html模板插件
    new HtmlWebpackPlugin({
      title: name,
      template: path.resolve(appDirectory, 'web/public/index.html'), // Load a custom template
      inject: 'body', // Inject all scripts into the body
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      showErrors: true,
    }),
    // 目录拷贝
    new CopyWebpackPlugin([
      {
        from: path.resolve(appDirectory, 'web/public'),
        to: path.resolve(appDirectory, 'dist/web/static'),
      },
    ]),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
    // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
    new webpack.DllReferencePlugin({
      manifest: path.resolve(appDirectory, 'dist/web/dll/vendor-manifest.json'),
    }),
    // 将某个文件打包输出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(appDirectory, 'dist/web/dll/*.dll.js'),
    }),
    // 为每个 chunk 文件头部添加 banner
    new webpack.BannerPlugin('@Copyright by BarryTse'),
  ],
};
