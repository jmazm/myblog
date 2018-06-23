const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const merge = require("webpack-merge")
const WriteFilePlugin = require("write-file-webpack-plugin")
const ModifyPrefixOfJsOrCssPlugin = require("./modifyPrefixOfJsOrCssPlugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const path = require("path")

const base = require('./webpack.base.config')
const config = require("../config")
const { indexPort, cmsPort} = config

/**
 * webpack-dev-middleware的配置
 index: [
 'react-hot-loader/patch',
 'webpack-hot-middleware/client',
 './client/views/index.jsx'
 ]
 */

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  entry: {
    'index': [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://0.0.0.0:${indexPort}`,
      'webpack/hot/only-dev-server',
      './client/views/User/index.jsx'
    ],
    'cms': [
      'react-hot-loader/patch',
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
    new webpack.HotModuleReplacementPlugin(),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ProgressBarPlugin()
  ]
})


