const baseServer = require("./sever.base")
const Koa = require("koa")
const KoaStaticCache = require("koa-static-cache")
const path = require("path")
const distDir = path.resolve(process.cwd(), './dist')
const config = require("../config")


module.exports = function (port) {
  const app = new Koa()
  baseServer(app)

  const routerMap = port == config.indexPort ? require("./router/index") : require("./router/cms")

  app.use(routerMap.routes())
    .use(routerMap.allowedMethods())

  // koa-static-cache ： 可以设置Http缓存

  app.use(KoaStaticCache(path.resolve(distDir, 'lib'), {
    maxAge: 60 * 60 * 24 * 30
  }))

  app.use(KoaStaticCache(path.resolve(distDir, 'imgs'), {
    maxAge: 60 * 60 * 24 * 30
  }))


  app.use(KoaStaticCache(path.resolve(distDir, `${port == config.indexPort ? 'index' : 'cms'}`), {
    maxAge: 60 * 60 * 24 * 30
  }))

  app.listen(port, () => {
    console.log(`${process.version} listening on port ${port} (${app.env})`)
  })
}