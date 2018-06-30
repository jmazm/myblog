const baseServer = require("./sever.base")
const Koa = require("koa")
const KoaStaticCache = require("koa-static-cache")
const path = require("path")
const distDir = path.resolve(process.cwd(), './dist')
const config = require("../config")


module.exports = function (port) {
  const app = new Koa()
  baseServer(app)

  const routerMap = port == config.dev.indexServerPort ? require("./router/index") : require("./router/cms")

  app.use(routerMap.routes())
    .use(routerMap.allowedMethods())

  /**
   * // ===
   * 1、强缓存：
   * 相关头字段：Cache-Control: max-age=60（单位s）、Expires（格林尼治时间）
   * 前者优先级 > 后者
   * 在过期时间内，相应的资源会从 （from memery cache/disk）中获取，并不会发送请求给服务器，返回200状态码
   *
   * 2、协商缓存
   * 过了过期时间，是 返回304，从缓存中拿数据 还是 返回200，拿新的资源回来，取决于两对相关头字段
   * 1、Last-Modified 和 If-Modified-Since：这里的值是文件的md时间
   * 2、Etag 和 If-None-Match：这里的值是根据文件内容计算出来的hash值，koa-static-cache这个包主要是用md5算法计算的
   *
   * 3、Cache-Control一些值的用法
   * max-age：
   * no-store:
   * no-cache:
   * public: 指定响应会被缓存，并且在多用户间共享
   * private: 响应只作为私有的缓存，不能在用户间共享。例如，用户的浏览器可以缓存包含用户私人信息的 HTML 网页，但 CDN 却不能缓存。
   * s-maxage:
   *
   * Cache-Control: no-cache, max-age=0 表示需要先询问服务器资源有没有变化，没有变化就直接返回304，有变化了就返回新资源和状态码200
   * === //
   */

  // koa-static-cache ： 可以设置Http缓存
  app.use(KoaStaticCache(path.resolve(distDir, `./${port == config.dev.indexServerPort ? 'index' : 'cms'}`), {
    maxAge: 60 * 60 * 24 * 30
  }))

  app.listen(port, () => {
    console.log(`${process.version} listening on port ${port} (${app.env})`)
  })
}