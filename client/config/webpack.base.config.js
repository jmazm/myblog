const path = require('path')
const webpack = require('webpack')
const HardSourceWebpackPlugin  = require("hard-source-webpack-plugin")

const common = require("../../config")

/**
 * 设置默认常用路径
 */
const srcDir = ''
// process.cwd() => 'E:\\projectAndNote\\blog\\myblog'
// 文件输出的地址
const assetsDir = path.resolve(process.cwd(), './dist')
// 生成JS的目录地址(默认:)
const jsDir = 'js/'
// 生成css的目录地址(默认:)
// const cssDir = 'views/'


module.exports = {
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.css'
    ],
    // 'E:\\projectAndNote\\blog\\myblog\\client\\node_modules'
    modules: [ path.resolve(srcDir, 'node_modules') ]
  },
  // 文件输出接口
  output: {
    path: assetsDir,
    // filename: `${jsDir}/[name]-[chunkhash].js`,
    filename: jsDir + '[name].js',
    publicPath: common.publicPath
  },
  // 模块（一般是Loader）
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|svg|gif|jpeg$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'imgs/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|ttf|svg$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'font/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // 清除
    // new CleanWebpackPlugin(['dist'],  {
    //   root: path.resolve(process.cwd(), './'),
    //   verbose: true,
    //   dry: false
    // }),
    // 确保输出资源不会包含错误
    new webpack.NoEmitOnErrorsPlugin(),
    new HardSourceWebpackPlugin()

  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 30000,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     // name: true,
  //     cacheGroups: {
  //       vendor: {
  //         test: /node_modules/,
  //         name: 'lib',
  //         chunks: 'all',
  //         reuseExistingChunk: true
  //       }
  //     }
  //   },
  //   runtimeChunk: true
  // }
}