const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const merge = require("webpack-merge")
const WriteFilePlugin = require("write-file-webpack-plugin")
const ModifyPrefixOfJsOrCssPlugin = require("./plugin/modifyPrefixOfJsOrCssPlugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const path = require("path")

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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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


