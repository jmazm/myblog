const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")
const config = require("../config")
const { indexPort, cmsPort, dev } = config

/**
 * webpack-dev-server
 * // ===
 * 1. 原理：启动一个 HTTP 服务器用于服务网页请求，同时会帮助启动 Webpack ，并接收 Webpack 发出的文件更变信号，通过 WebSocket 协议自动刷新网页做到实时预览。
 * 2. 特点：
   2.1 实时预览：
   2.1.a 通过 webpack --watch 来开启监听模式；
   2.1.b 通过 DevServer 启动的 Webpack 会开启监听模式，当发生变化时重新执行完构建后通知 DevServer。
         DevServer 会让 Webpack 在构建出的 JavaScript 代码里注入一个代理客户端用于控制网页，网页和 DevServer 之间通过 WebSocket 协议通信，以方便 DevServer 主动向客户端发送命令。
         DevServer 在收到来自 Webpack 的文件变化通知时通过注入的客户端控制网页刷新。
   2.2 热模块替换：
   2.3 支持source-map：
 * === //
 * // ===
 * 1. hot：开启模块热替换功能后将在不刷新整个页面的情况下通过用新模块替换老模块来做到实时预览。
 * === //
 */


// === 开发环境中 客户端 与 服务器热更新 优化探索： === //

// === 方案一：将客户端与服务器端分开 === //
/*
  客户端用webpack-dev-server，且有HRM;
  服务器用nodemon，且能HRM；
  优点是：前后端都能热更新，且很快
  缺点是：开发时需要分端口，客户端有两个端口，服务器有有个端口，再加上另一台图片服务器要开一个端口，比较混乱;
  且无法同构
*/

// === 方案二：客户端与服务器共用，就是将dev-server放到koa中，用到的中间件为webpack-dev-middleware === //
/*
  优点是：客户端与服务器都能热更新，且客户端的热更新速度不变，为2~3s左右，端口也变少，不用跨域配置
  缺点是：服务器端热更新时，客户端也要被迫热更新，重启速度很慢，为9s左右。因为webpack-dev-middleware是koa服务器的一部分，会跟随者koa重启而非基于之前的缓存
*/

// === 方案三：能不跨域，且客户端热更新与服务器端热更新互不干扰，则能保留以上两种方案的优点，且去掉两种方案的缺点 === //
/*
  思路：node热更新必然导致webpack重启，这避免不了，所以只能减少编译的时间，而占用大部分时间的是很多重复的编译，比如react，react-router这些依赖
  缺点：但工作量很大，需要自己去深度分析webpack插件
 */

// === 方案四：客户端依然使用 dev server 能热更新，但不处理请求，只负责转发，请求由后端koa处理 === //
/*
  koa的重启必然导致webpack-dev-middleware的重启，重新编译避免不了，
  因此只能分为devServer和koa，而devServer在处理请求方面只做代理，所有请求都转发去Koa服务器上，这样能保持域名相同，
  且能实现同构；除此之外还保留了webpack-dev-server的热更新；

  但有一个很坑的地方要注意: devServer里代理只是一个中间件，且处理请求的顺序在 / 之后，因此正常情况下无法处理 / ，因此要改变中间件的执行顺序
  方法：将webpack-dev-server中Server.js中的 defaultFeatures.push('proxy', 'middleware'); 的push改为unshift
 */

function devServer (port) {
  const proxyPort = port === indexPort ? dev.indexServerPort : dev.cmsServerPort
  const devServerCongig = require("./webpack.dev.config")

  let app = new WebpackDevServer(webpack(devServerCongig), {
    public: `http://127.0.0.1:${proxyPort}`,
    // publicPath: '/',
    hot: true,
    historyApiFallback: true,
    proxy: {
      '*': `http://127.0.0.1:${proxyPort}`
    },
    stats: {
      colors: true
    }
  })

  app.listen(port, function (err) {
    if (err) {
      console.log(err)
    }
    console.log(`Listening at localhost:${port}`)
  })
}

devServer(indexPort)

devServer(cmsPort)