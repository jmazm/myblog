const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const merge = require("webpack-merge")

const base = require('./webpack.base.config')

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
    new HtmlWebpackPlugin({
      template: './client/views/index.html',
      inject: true,
      hash: true,
      minify: {
        sortAttributes: true,
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ProgressBarPlugin()
  ]
})


