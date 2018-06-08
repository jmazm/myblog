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
        test: /\.(jpg|png|gif|jpeg$)/i,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     // name: 指定打包生成后资源文件的name值
          //     // name: 'imgs/[name].[ext]',
          //     name: '[name].[ext]',
          //     // 定义图片输出存放的文件夹位置
          //     ouputPath: '/imgs/',
          //     // 设置路径为相对位置
          //     useRelativePath: true
          //   }
          // }

          // url-loader：
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              // 只针对 background: url("../../../../static/imgs/weibo.jpg")有用
              // 如果是img的src的话，则是http://127.0.0.1:3000/static/imgs/me3.jpg，无效
              // 因此，如果是background请求图片，则可以用url-loader
              // 如果是img的src，则需要使用copy-webpack-plugin

              // output设置：'/imgs/' ==> http://imgs/638a9858e251be9b57168a896c8394c0.jpg
              // output设置：'imgs/' ==> http://127.0.0.1:3000/imgs/638a9858e251be9b57168a896c8394c0.jpg
              outputPath: 'imgs/',
              // 如果设置了useRelativePath为true，则图片最后的请求路径为：http://127.0.0.1:3000/static/imgs/638a9858e251be9b57168a896c8394c0.jpg
              // 如果设置了useRelativePath为false，则图片最后的请求路径为：http://127.0.0.1:3000/imgs/638a9858e251be9b57168a896c8394c0.jpg
              // useRelativePath: true
            }
          }
        ]
      },
      // file-loader：项目中定义加载的图片通过webpack编译打包，并返回一个编码后的公共的url路径。
      {
        test: /\.(eot|woff|ttf|svg$)/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
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