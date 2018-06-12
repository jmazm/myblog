if (process.env.NODE_ENV !== 'test') {
  // 同构需要的

  require('source-map-support').install()

  require('babel-core/register', {
    ignore: /\.css$/
  })
  require('babel-polyfill')
  require('asset-require-hook')({
    extensions: [
      'jpg', 'png', 'gif', 'webp'
    ],
    name: '/dist/img/[name].[ext]',
    limit: 2000
  })

// 忽略css
  require('css-modules-require-hook')({
    generateScopedName: '[name]__[local]_[hash:base64:3]',
    camelCase: true,
    rootDir: './client/'
  })
}


// const https = require("https")
const Koa = require("koa")
const path = require("path")
const compress = require("koa-compress")
const koaStaticCache = require("koa-static-cache")
const mysql = require("mysql2/promise")
const debug = require("debug")('app')
const body = require("koa-body")
const logger = require('koa-logger')
const routerMap = require("./router")
const common = require("../config")
const STATICDIST = path.resolve(__dirname, '../dist')

const app = new Koa()

// 将myql连接池暴露在全局环境下
global.db = mysql.createPool(common.dbConfig)

// 在 X-Response-Time 的响应头返回响应时间
app.use(async function responseTime (ctx, next) {
  const time1 = Date.now()
  await next()
  const time2 = Date.now()
  ctx.set('X-Response-Time', Math.ceil(time2 - time1) + 'ms')
})

// HTTP 压缩，自动读取.gz文件
app.use(compress({}))


//使用logger日志库
if (process.env.NODE_ENV !== 'test') {
  app.use(logger());
}

// 为JWT cookie 和 session cookie 设置cookie 密钥
// app.keys = ['jmazm', 'myblog']

// parse request body into ctx.request.body
// - multipart allows parsing of enctype=multipart/form-data
app.use(body({
  multipart: true
}))



// 设置session(uses signed session cookies, with no server storage)
// app.use(session(app))

// 追踪每一个请求
app.use(async function (ctx, next) {
  debug(`${ctx.method}: ${ctx.url}`)
  await next()
})

// 处理一些抛出错误的情况（这里主要是处理用户权限验证）
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const statusCode = err.status || err.statusCode || 500
    const errMsg = err.message || 'Internal Server Error'
    ctx.response.status = statusCode
    ctx.body = {
      status: 'failure',
      msg: errMsg
    }
  }
})

// 设置静态路径
app.use(koaStaticCache(STATICDIST, {
  maxAge: 60 * 60 * 24 * 30
}))

app.use(routerMap.routes())
  .use(routerMap.allowedMethods())


// 监听端口
// https.createServer(config.https.options,app.callback()).listen(config.https.port)

module.exports = app

