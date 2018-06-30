const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WriteFilePlugin = require("write-file-webpack-plugin")
const merge = require("webpack-merge")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const ExtractTextWepackPlugin = require("extract-text-webpack-plugin")

const ModifyPrefixOfJsOrCssPlugin = require("./plugin/modifyPrefixOfJsOrCssPlugin")
const path = require("path")

const rootDir = process.cwd()
const base = require('./webpack.base.config')
const config = require("../config")
const { indexPort, cmsPort} = config

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  /**
   * 模块热替换(Hot Module Replacement)的技术
   * // ===
   * 1. 原理：当一个源码发生变化时，只重新编译发生变化的模块，再用新输出的模块替换掉浏览器中对应的老模块。
   * 2. 优势：
     2.1 实时预览反应更快，等待时间更短。
     2.2  不刷新浏览器能保留当前网页的运行状态，例如在使用 Redux 来管理数据的应用中搭配模块热替换能做到代码更新时 Redux 中的数据还保持不变。
   * === //
   */
  entry: {
    'index': [
      'react-hot-loader/patch',
      // 为每个入口都注入代理客户端
      `webpack-dev-server/client?http://0.0.0.0:${indexPort}`,
      'webpack/hot/only-dev-server',
      './client/views/User/index.jsx'
    ],
    'cms': [
      'react-hot-loader/patch',
      // 为每个入口都注入代理客户端
      `webpack-dev-server/client?http://0.0.0.0:${cmsPort}`,
      'webpack/hot/only-dev-server',
      './client/views/Admin/index.jsx'
    ]
  },
  module: {
    rules: [
      /**
       * css模块化
       * // ===
       * 1. 解决问题： 所有的css是打包到一个css文件的，会出现全局污染，命名混乱，无法共享变量
       * 2. 使用
         2.1 css-loader中开启module参数，每个jsx中引入的样式都是local的，也可以通过:global来声明全局
         2.2 不层叠多个class而是通过compose来实现样式复用
         2.3 命名规则还是可以遵循BEM, 且不再需要通过增加层级嵌套来限制，每个类只需要一个层级，提高查找性能
         2.4 可引入变量，比如颜色值的同一管理
         2.5 我会把全局变量提取出来放在一个专门的css文件中，在jsx中使用的时候如果不加style.*就是使用全局样式
       * 3. 缺点：必须每次都加style.*, 【在ssr中无法用babel-plugin-react-css-modules？？？？】
       * === //
       */
      {
        test: /\.css$/,
        // static文件夹下的css文件不会被模块化
        exclude: path.resolve(rootDir, './client/static'),
        use: ExtractTextWepackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // 开启css模块化
                modules: true,
                // 样式的最终命名方式
                localIdentName: '[local]_[name]_[hash:base64:5]',
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('postcss-icss-values'),
                  require('autoprefixer')
                ]
              }
            }
          ]
        })
      },

      // 使用以下规则的loader翻译static中的css文件
      {
        test: /\.css$/,
        include: path.resolve(rootDir, './client/static'),
        use: ExtractTextWepackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    // 清除
    new CleanWebpackPlugin(['dist'],  {
      root: path.resolve(process.cwd(), './'),
      verbose: true,
      dry: false
    }),

    new HtmlWebpackPlugin({
      template: './client/views/index.dev.html',
      inject: true,
      hash: true,
      minify: {
        sortAttributes: true,
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'index/index.html',
      chunks: [
        'index'
      ]
    }),

    new HtmlWebpackPlugin({
      template: './client/views/index.dev.html',
      inject: true,
      hash: true,
      minify: {
        sortAttributes: true,
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'cms/index.html',
      chunks: [
        'cms'
      ]
    }),

    new ExtractTextWepackPlugin({
      filename: '[name]/index.css',
      disable: false,
      allChunks: true
    }),

    new WriteFilePlugin(),
    new ModifyPrefixOfJsOrCssPlugin(),
    // 该插件的作用就是实现模块热替换，实际上当启动时带上 `--hot` 参数，会注入该插件，生成 .hot-update.json 文件。
    new webpack.HotModuleReplacementPlugin(),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境 - 显示出被替换模块的名称
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ProgressBarPlugin()
  ]
})


