const Router = require("koa-router")
const tag = require('./tag')
const category = require('./category')
const article = require('./article')
const comment = require('./comment')
const user = require('./user')
const captchar = require('./captcha')
const container = require('./container')
const fs = require("fs")
const path = require("path")

const router = new Router()

// 同构页面
/**
 * 路由1：/category
 * 路由2：/category/:category/article
 * 当在地址栏输入/category/:category/article时候，匹配的却是路由1，这并不是我想要的。
 * 原因：koa-router的路由优先级问题
 * 根本原因则是： Router.prototype.use这个方法的问题
 *
 * 在router.use(routerPage.routes(), routerPage.allowedMethods())时没有设置前缀,
 * 路由就自动添加了默认的前缀"(.*)"，这里的path发生了改变,在路由后续的操作中，
 * 将path使用pathToRegExp转换成正则表达式时 "/category" 这个path本应该是 /^\/test...../ 就会变成/(.*)/\/test...
 *
 */
router.use(container.routes(), container.allowedMethods())

router.use('/api', tag.routes(), tag.allowedMethods())
router.use('/api', category.routes(), category.allowedMethods())
router.use('/api', article.routes(), article.allowedMethods())
router.use('/api', comment.routes(), comment.allowedMethods())
router.use('/api', user.routes(), user.allowedMethods())
router.use('/api', captchar.routes(), captchar.allowedMethods())


// 主要处理刷新页面的时候，NOT FOUND
// router.get(/^\/admin|^\/article|^\/category|^\/tag/, function (ctx) {
//   const indexUrl = path.resolve(process.cwd(), 'dist/index.html')
//   const data = fs.readFileSync(indexUrl, 'utf8')
//   ctx.body = data
// })

module.exports = router

