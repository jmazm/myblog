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
          // url-loader：url-loader作用和file-loader的作用基本是一致的，
          // 不同点是url-loader可以通过配置一个limit值来决定图片是要像file-loader一样返回一个公共的url路径，
          // 或者直接把图片进行base64编码，写入到对应的路径中去。
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
              // outputPath是相对于output的path而言，所以imgs文件夹会被建立在dist文件夹下
              outputPath: 'imgs/',
              // 如果设置了useRelativePath为true，则图片最后的请求路径为：http://127.0.0.1:3000/static/imgs/638a9858e251be9b57168a896c8394c0.jpg
              // 如果设置了useRelativePath为false，则图片最后的请求路径为：http://127.0.0.1:3000/imgs/638a9858e251be9b57168a896c8394c0.jpg
              // useRelativePath: true
            }
          },

          // 用来对编译过后的文件进行压缩处理，在不损失图片质量的情况下减小图片的体积大小。
          {
            loader: 'image-webpack-loader',
            options: {
              // 设置对jpg格式的图片压缩的程度
              mozjpeg: {
                progressive: true,
                quality: 70
              }
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
              name: '[name].[ext]',
              outputPath: 'fonts/'
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