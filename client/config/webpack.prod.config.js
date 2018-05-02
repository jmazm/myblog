const path = require("path")
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackParallelUglifyPlugin = require("webpack-parallel-uglify-plugin")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
// const DllReferencePlugin = require("webpack/lib/DllReferencePlugin")
const ModuleConcatenationPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin")
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin")

const config = require('./webpack.base.config')

config.mode = 'production'

config.entry = {
  index: ['babel-polyfill', './client/views/index.jsx'],
  vendor: [
    'react',
    'react-dom',
    'react-router-dom'
  ]
}

// 确认在哪里解析文件
// config.resolve.mainFields = ['jsnext:main', 'browser', 'main']

// 非入口文件的命名
// config.output.chunkFilename = '[name].js'

config.module.rules.push(
  {
    test: /\.css$/,
    use:ExtractTextWebpackPlugin.extract({
      fallback:'style-loader',
      use:[
        'css-loader'
      ]
    })
  }
)

// 定义环境
config.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
)

// 定义模板
config.plugins.push(
  new HtmlWebpackPlugin({
    template: './client/views/index.html',
    inject: true,
    showErrors:true,
    minify: {
      // 移除评论
      removeComment: true,
      // 去除空白区域
      collapseWhitespace: true
    },
    // chunk: [
    //   'index'
    // ],
    // 指定子目录
    filename: 'index.html'
  })
)

config.plugins.push(
  new ExtractTextWebpackPlugin({
    filename: 'css/[name].css',
    disable: false,
    allChunks: true
  })
)

// config.plugins.push(
//   new WebpackParallelUglifyPlugin({
//     // 传递给uglifyJS的参数
//     uglifyJS: {
//       output: {
//         // 最紧凑的输出
//         beautify: true,
//         // 删除所有的注释
//         comments: false
//       },
//       compress: {
//         // 在UglifyJs删除没有用到的代码时不输出警告
//         warnings: false,
//         // 删除所有的console.log语句
//         drop_console: true,
//         // 内嵌定义了但是只用到一次的变量
//         collapse_vars: true,
//         // 提取出出现多次但是没有定义成变量去引用的静态值
//         reduce_vars: true
//       }
//     },
//     include: process.cwd(),
//     exclude: /node_modules/
//   })
// )

// 用 HashedModuleIdsPlugin 可以轻松地实现 chunkhash 的稳定化
config.plugins.push(
  new webpack.HashedModuleIdsPlugin()
)

// 主要处理闭包
// config.plugins.push(
//   new ModuleConcatenationPlugin()
// )

config.plugins.push(
  new webpack.optimize.AggressiveMergingPlugin()
)

// config.plugins.push(
//   new DllReferencePlugin({
//     manifest: require(path.resolve(process.cwd(), '../dist/js/remark.manifest.json'))
//   })
// )
// config.plugins.push(
//   new DllReferencePlugin({
//     manifest: require(path.resolve(process.cwd(), '../dist/js/reactRenderer.manifest.json'))
//   })
// )


// config.plugins.push(
//   new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
// )

// config.plugins.push(
//   new CompressionWebpackPlugin({
//     test: /\.js$|\.css$|\.html$/,
//     asset: '[path].gz[query]',
//     algorithm: 'gzip',
//     // 只处理大于这个字节的文件
//     threshold: 10240,
//     minRatio: 0.8
//   })
// )

// config.externals = {
//   'react': 'React',
//   'react-dom': 'ReactDOM',
//   'react-router': 'ReactRouter',
//   'react-router-dom': 'ReactRouterDOM',
//   'redux': 'Redux',
//   'react-redux': 'ReactRedux',
//   'redux-saga': 'ReduxSaga',
//   'axios': 'axios',
//   'remark': 'remark',
//   'remark-react': 'reactRenderer'
// }


config.plugins.push(
  new ProgressBarPlugin()
)


module.exports = config