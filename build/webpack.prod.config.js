const path = require("path")
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackParallelUglifyPlugin = require("webpack-parallel-uglify-plugin")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin")
const ModuleConcatenationPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin")
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackIncludeAssestsPlugin = require("html-webpack-include-assets-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const autoprefixer = require('autoprefixer')
// const precss = require('precss')
// const postcsseasysprites = require('postcss-easysprites')

const ModifyPrefixOfJsOrCss = require("./modifyPrefixOfJsOrCssPlugin")
const merge = require("webpack-merge")
const base = require('./webpack.base.config')

const rootDir = process.cwd()

module.exports = merge(base, {
  mode: 'production',
  devtool: false,
  entry: {
    index: './client/views/User/index.jsx',
    cms: './client/views/Admin/index.jsx'
  },
  resolve: {
    // 决定优先采用那份代码
    // jsnext:main表示es6的代码，优先采用es6的那份代码
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  output: {
    // 非入口文件的命名
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:ExtractTextWebpackPlugin.extract({
          fallback:'style-loader',
          use:[
            'css-loader',
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    // 定义环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    // 定义模板 - index
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, './client/views/User/index.html'),
      inject: true,
      showErrors:true,
      minify: {
        // 移除评论
        removeComment: true,
        // 去除空白区域
        collapseWhitespace: true
      },
      // 指定子目录
      filename: 'index/index.html',
      chunks: [
        'index'
      ],
    }),

    // 定义模板 - cms
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, './client/views/Admin/index.html'),
      inject: true,
      showErrors:true,
      minify: {
        // 移除评论
        removeComment: true,
        // 去除空白区域
        collapseWhitespace: true
      },
      // 指定子目录
      filename: 'cms/index.html',
      chunks: [
        'cms'
      ],
    }),

    // 修改嵌入html中的js和css的路径
    new ModifyPrefixOfJsOrCss(),

    // 进度条
    new ProgressBarPlugin(),

    // 闭包降低浏览器中JS执行效率，原因：闭包函数降低了JS引擎解析速度。
    // ModuleConcatenationPlugin 可将一些有联系的模块，放到一个闭包函数里面去，通过减少闭包函数数量从而加快JS的执行速度。
    new ModuleConcatenationPlugin(),

    // 用 HashedModuleIdsPlugin 可以轻松地实现 chunkhash 的稳定化
    new webpack.HashedModuleIdsPlugin(),

    // 合并块
    new webpack.optimize.AggressiveMergingPlugin(),

    // gzip压缩
    new CompressionWebpackPlugin({
      test: /\.js$|\.css$|\.html$/,
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      // 只处理大于这个字节的文件
      threshold: 10240,
      minRatio: 0.8
    }),

    // 压缩js
    new WebpackParallelUglifyPlugin({
      // 传递给uglifyJS的参数
      uglifyJS: {
        output: {
          // 最紧凑的输出
          beautify: true,
          // 删除所有的注释
          comments: false
        },
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的console.log语句
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true
        }
      },
      include: process.cwd(),
      exclude: /node_modules/
    }),

    // 分离css
    new ExtractTextWebpackPlugin({
      filename: '[name]/index.css',
      disable: false,
      allChunks: true
    }),

    // 复制图片
    new CopyWebpackPlugin([
      {
        from: './client/static/imgs',
        to: './../dist/imgs',
        toType: 'dir'
      }
    ]),

    // dll
    new DllReferencePlugin({
      manifest: require(path.resolve(process.cwd(), './dist/lib/react.manifest.json'))
    }),
    new DllReferencePlugin({
      manifest: require(path.resolve(process.cwd(), './dist/lib/redux.manifest.json'))
    }),
    new DllReferencePlugin({
      manifest: require(path.resolve(process.cwd(), './dist/lib/remark.manifest.json'))
    }),
    new DllReferencePlugin({
      manifest: require(path.resolve(process.cwd(), './dist/lib/axios.manifest.json'))
    }),
    new DllReferencePlugin({
      manifest: require(path.resolve(process.cwd(), './dist/lib/other.manifest.json'))
    }),

    // 将资源路径自动添加到页面上
    new HtmlWebpackIncludeAssestsPlugin({
      //  添加的资源相对 html 路径而言
      // <script type="text/javascript" src="/react.js">
      assets: [
        'react.js',
        'redux.js',
        'axios.js',
        'remark.js',
        'other.js'
      ],
      append: false // false 在其他資源的之前添加 true 在其他資源之後添加
    })
  ]
})