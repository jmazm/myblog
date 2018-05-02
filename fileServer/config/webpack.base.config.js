const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const serverConfig = require('./server.dev.config')

// 源代码的根目录
const ROOT_PATH = path.resolve(__dirname)
// 资源根目录
const ENTRY_PATH = path.resolve(ROOT_PATH, '../client')
// 打包后的资源根目录
const OUTPUT_PATH = path.resolve(ROOT_PATH, '../build')

console.log(ENTRY_PATH, path.resolve(ENTRY_PATH, '../index.jsx'))

module.exports = {
  context: ROOT_PATH,
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  // 入口文件
  entry: {
    index: [
      'react-hot-loader/patch',
      'babel-polyfill',
      path.resolve(ENTRY_PATH, './index.jsx')
    ],
    vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux','redux-saga']
  },
  // 文件输出接口
  output: {
    path: path.resolve(OUTPUT_PATH),
    filename: '[hash].bundle.js',
    publicPath: '/'
  },
  // 模块（一般是Loader）
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['less-loader', {loader: 'css-loader', options: {sourceMap: 1}}, "postcss-loader", "less-loader"]
      },
      {
        test: /\.(png|jpg|gif|jpeg|PNG|JPG|GIF|JPEG)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|ttf|woff2|svg)$/,
        use: ['url-loader']
      }
    ]
  },
  // 插件
  plugins: [
    // 清除
    new CleanWebpackPlugin(['build']),
    // 加入 html 模板
    new HtmlWebpackPlugin({
      template: '../client/index.html',
      filename: 'index.html'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: true
  },
}