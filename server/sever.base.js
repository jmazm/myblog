const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV !== 'test') {
  // 同构需要的

  require('source-map-support').install()

  // babel-register 通过绑定 require函数的方式（require hook）,在 require jsx文件时，使用babel转换语法，
  // 因此，应该在任何 jsx 代码执行前，执行 require('babel-register')(config)，同时通过配置项config，配置babel语法等级、插件等
  // 但对 less/css 文件无能为力，一般情况下，服务端渲染不需要样式文件的参与，css文件只要引入到HTML文件中即可，因此，可以通过配置项，忽略所有 css/less 文件
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

const compress = require("koa-compress")
const mysql = require("mysql2/promise")
const debug = require("debug")('app')
const body = require("koa-body")
const validate = require("koa-validate")
const logger = require('koa-logger')
const common = require("../config")

module.exports = function (app) {
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
  if (NODE_ENV !== 'test') {
    app.use(logger());
  }

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
}




