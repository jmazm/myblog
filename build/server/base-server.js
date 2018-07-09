const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")
const config = require("../../config")
const { indexPort, dev } = config
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


/**
 * 开发环境中 客户端 与 服务器热更新 优化探索
 * // ===
 * 1. 前后端分离
   1.1 前端：webpack-dev-server(有HMR)； 后端：koa + nodemon（能HRM）
   1.2 缺点：
     1.2.a 每次都要启动两个服务器，即，前后端要分端口：前端有两个端口（cms和index），后端有一个端口，图片服务器又有一个端口，比较难打理！
     1.2.b 无法实现同构，需要跨域处理
   1.3 优点：
     修改前后端代码，只会重启自己的服务器，即：前后端都可以热更新，速度快，且不会互相影响
 * 2. 前后端共线
   2.1 将dev-server放到koa中，即webpack-dev-middleware + webpack-hot-middleware作为koa的中间件使用
   2.2 缺点：每次服务端热更新，客户端就会被迫热更新，并且客户端都是重新编译一次，耗时在8-9s左右，比较耗时
   2.3 优点：客户端和服务器端共用一个端口号（cms 8080，index 3000），客户端热更新速度比较快（1-2s左右）；可实现同构，不需要跨域处理
 * 3. 最优解决方案：客户端依旧使用webpack-dev-server进行热更新，但不处理请求，只负责转发，请求由后端koa处理
   3.1 思路
     koa的重启必然导致webpack-dev-server的重启，因此重新编译避免不了，
     所以只能将koa和webpack-dev-server分开，dev-server在处理请求方面只做代理，
     所有请求都转发去Koa服务器上，就不需要进行跨域处理。
     也能实现同构，前端和后端的热更新互不影响
 * === //
 */

function devServer (port) {
  const proxyPort = port === indexPort ? dev.indexServerPort : dev.cmsServerPort
  const devServerCongig = require("../webpack.dev.config")

  let app = new WebpackDevServer(webpack(devServerCongig), {
    // public指路由的host值或者说在给定路由的前面添加的值
    public: `http://127.0.0.1:${proxyPort}`,
    // 告诉 DevServer 要开启模块热替换模式
    hot: true,
    historyApiFallback: true,
    proxy: {
      '*': `http://127.0.0.1:${proxyPort}`
    },
    stats: {
      colors: true
    },
    watchOptions: {
      // 排除一些巨大的文件夹
      ignored: /node_modules/
    }
  })

  app.listen(port, function (err) {
    if (err) {
      console.log(err)
    }
    console.log(`Listening at localhost:${port}`)
  })
}

module.exports = devServer