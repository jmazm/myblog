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

const ModifyPrefixOfJsOrCss = require("./plugin/modifyPrefixOfJsOrCssPlugin")
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
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    // 这也是为了充分发挥 Scope Hoisting 的作用
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
            // 通过 minimize 选项压缩 CSS 代码
            'css-loader?minimize',
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

    /**
     * 开启 Scope Hoisting - webpack/lib/optimize/ModuleConcatenationPlugin
     * // ===
     * 1. 原理：析出模块之间的依赖关系，尽可能的把打散的模块合并到一个函数中去，但前提是不能造成代码冗余。 因此只有那些被引用了一次的模块才能被合并。
     * 2. 注意：由于 Scope Hoisting 需要分析出模块之间的依赖关系，因此源码必须采用 ES6 模块化语句，不然它将无法生效。
          在.babelrc中的preset中配置 {"modules": false}
     * 3. 优势
       3.1 代码体积更小，因为函数申明语句会产生大量代码；
       3.2 代码在运行时因为创建的函数作用域更少了，内存开销也随之变小。
     * === //
     */
    //
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

    /**
     * ParallelUglifyPlugin
     * // ===
     * 原理
       当 Webpack 有多个 JavaScript 文件需要输出和压缩时，原本会使用 UglifyJS 去一个个挨着压缩再输出，
       但是 ParallelUglifyPlugin 则会开启多个子进程，把对多个文件的压缩工作分配给多个子进程去完成，
       每个子进程其实还是通过 UglifyJS 去压缩代码，但是变成了并行执行。
       所以 ParallelUglifyPlugin 能更快的完成对多个文件的压缩工作。
     * === //
     */
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
      include: path.resolve(rootDir, './client'),
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
