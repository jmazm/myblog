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
const validate = require("koa-validate")
const logger = require('koa-logger')
const routerMap = require("./router")
const common = require("../config")
const STATICDIST = path.resolve(__dirname, '../dist')

const app = new Koa()

// 将myql连接池暴露在全局环境下
global.db = mysql.createPool(common.dbConfig)

// 拦截器 - validate url params, url queries, request bodies, headers as well as files
validate(app)

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
      message: errMsg
    }
  }
})

// 设置静态路径
// koa-static-cache ： 可以设置Http缓存
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
app.use(koaStaticCache(STATICDIST, {
  maxAge: 60 * 60 * 24 * 30
}))

// 追踪每一个请求
app.use(async function (ctx, next) {
  debug(`${ctx.method}: ${ctx.url}`)
  await next()
})

/**
 * 点击劫持：将目标网站放入iframe中，视觉上隐藏，并指导用户操作
 * // ===
 * 1. 特点：用户亲手操作，用户不知情
 * 2. 危害：盗取用户资金，获取用户敏感信息
 * 3. 防御
   3.1 Javascript禁止内嵌，但sandbox能禁止js
   3.2 X-Frame-Options：给浏览器指示允许一个页面可否在 <frame>, <iframe> 或者 <object> 中展现的标记
     有三个值：
      DENY - 完全禁止嵌套iframe
      SAMEORIGIN - 表示该页面可以在相同域名页面的 frame 中展示。
      ALLOW-FROM uri - 表示该页面可以在指定来源的 frame 中展示。
   3.3 其它辅助手段：增加用户操作成本，如验证码
   3.4 X-XSS-Protection ：现代浏览器已不再需要
 * === //
 */

app.use(async function (ctx, next) {
  ctx.set('X-XSS-Protection', '1; mode=block')
  ctx.set('X-Frame-Options', 'DENY')

  await next()
})

app.use(routerMap.routes())
  .use(routerMap.allowedMethods())


// 监听端口
// https.createServer(config.https.options,app.callback()).listen(config.https.port)

module.exports = app

