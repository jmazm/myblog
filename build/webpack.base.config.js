/**
 * 构建
 * // ===
 * 1. 为什么要构建？ - 源代码无法直接运行，必须通过转换后才可以正常运行。
 * 2. 构建做了什么？
   2.1 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
   2.2 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
   2.3 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
   2.4 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
   2.5 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
   2.6 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
   2.7 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。
 * 3. 常用构建工具
   3.1 npm
   3.2 Grunt
     3.2.a 优点：灵活，它只负责执行你定义的任务；大量的可复用插件封装好了常见的构建任务。
     3.2.b 缺点：集成度不高，要写很多配置后才可以用，无法做到开箱即用。
   3.3 Gulp
     优点：是好用又不失灵活，既可以单独完成构建也可以和其它工具搭配使用。
     缺点：和 Grunt 类似，集成度不高，要写很多配置后才可以用，无法做到开箱即用。
   3.4 Fis3
   3.5 webpack
     3.5.a 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，
           通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。
           Webpack 专注于构建模块化项目。
     3.5.b 优点：
       a、专注于处理模块化的项目，能做到开箱即用一步到位；
       b、通过 Plugin 扩展，完整好用又不失灵活；
       c、使用场景不仅限于 Web 开发；
       d、社区庞大活跃，经常引入紧跟时代发展的新特性，能为大多数场景找到已有的开源扩展；
       e、良好的开发体验。
     3.5.c 缺点：只能用于采用模块化开发的项目。
 * === //
 */

/**
 * webpack - 工作原理
 * // ===
 * 1. 核心概念:
   1.1 Entry：入口，webpack执行构建的第一步就是从入口文件开始，可抽象成输入
   1.2 Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。
   1.3 Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块
   1.4 Plugin：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情
   1.5 Loader：模块转换器，用于把模块原内容按照需求转换成新内容
   1.6 Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割
 * 2. 流程概括
   2.1 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
      2.1.a Compiler 负责文件监听和启动编译。Compiler 实例中包含了完整的 Webpack 配置，全局只有一个 Compiler 实例。
   2.2 编译：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
   2.3 输出：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。

   在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。
 * === //
 */

const path = require('path')
const webpack = require('webpack')
// const HardSourceWebpackPlugin  = require("hard-source-webpack-plugin")
const common = require("../config")

/**
 * 设置默认常用路径
 */
const rootDir = process.cwd()
// process.cwd() => 'E:\\projectAndNote\\blog\\myblog'
// 文件输出的地址
const assetsDir = path.resolve(rootDir, './dist')


module.exports = {
  /**
   * resolve: 配置 Webpack 如何寻找模块所对应的文件，相关属性
   * // ===
   * 1. alias: 通过别名来把原导入路径映射成一个新的导入路径
   * 2. mainFields：有一些第三方模块会针对不同环境提供几分代码，Webpack 会根据 mainFields 的配置去决定优先采用那份代码
   * 3. extensions： 用于配置在尝试过程中用到的后缀列表
   * 4. modules： 配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去 node_modules 目录下寻找
   * === //
   */
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.css'
    ]
  },
  /**
   * output 配置项
   * // ===
   * 1. filename：配置输出文件的名称
     1.1 只有一个输出文件：'bundle.js'
     1.2 有多个 Chunk 要输出就要使用模板和变量：
       1.2.a '[name].js' == 》 Chunk 的名称
       1.2.b '[id].js' == 》 Chunk 的唯一标识，从0开始
       1.2.c '[hash:8].js' == 》 Chunk 的唯一标识的 Hash 值，默认20位
       1.2.d '[chunkhash:8].js' == 》 Chunk 内容的 Hash 值，默认20位
       1.2.e ExtractTextWebpackPlugin 插件是使用 contenthash 来代表哈希值而不是 chunkhash
     1.3 chunkFilename：配置无入口的 Chunk 在输出时的文件名称
       只用于指定在运行过程中生成的 Chunk 在输出时的文件名称
       常见的会在运行时生成 Chunk 场景有在使用 CommonChunkPlugin、使用 import('path/to/module') 动态加载等时。
     1.4 path: 配置输出文件存放在本地的目录
     1.5 publicPath：配置发布到线上资源的 URL 前缀，默认值是空字符串 ''，即使用相对路径
   * === //
   */
  output: {
    path: assetsDir,
    filename: '[name]/index.js',
    publicPath: common.publicPath
  },
  /**
   * module
   * // ===
   * 1. 条件匹配：通过 test 、 include 、 exclude 三个配置项来命中 Loader 要应用规则的文件。
   * 2. 应用规则：对选中后的文件通过 use 配置项来应用 Loader，可以只应用一个 Loader 或者按照从后往前的顺序应用一组 Loader，同时还可以分别给 Loader 传入参数。
   * 3. 重置顺序：一组 Loader 的执行顺序默认是从右到左执行
        通过 enforce 选项可以让其中一个 Loader 的执行顺序放到最前或者最后
        enforce:'post' => 把该 Loader 的执行顺序放到最后
        enforce: pre => 代表把 Loader 的执行顺序放到最前面
   * === //
   */
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // 排除 node_modules 目录下的文件
        exclude: /node_modules/,
        use: [
          // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
          // 'babel-loader?cacheDirectory'
          {
            loader:'babel-loader',
            options:{
              cacheDirectory:true,
            },
            // enforce:'post' 的含义是把该 Loader 的执行顺序放到最后
            // enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面
            // enforce:'post'
          }
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg|bmp$)/i,
        // 排除 node_modules 目录下的文件
        exclude: /node_modules/,
        use: [
          /**
           // === url-loader：url-loader作用和file-loader的作用基本是一致的 ，
              不同点是url-loader可以通过配置一个limit值来决定图片是要像file-loader一样返回一个公共的url路径，
              或者直接把图片进行base64编码，写入到对应的路径中去。=== //

           // === 图片优化之Image Inline：将图片转化成base64编码内嵌到html/css中以减少HTTP请求数 === //
           // === 使用场景：图片1~2K左右，因为base64会比原来大，而且最好是存在css中进行缓存 === //
           */
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
    // new HardSourceWebpackPlugin()

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
  //         name: 'vendor',
  //         chunks: 'all',
  //         reuseExistingChunk: true
  //       }
  //     }
  //   },
  //   runtimeChunk: true
  // }
}