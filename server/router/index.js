const Router = require("koa-router")
const tag = require('./tag')
const category = require('./category')
const article = require('./article')
const comment = require('./comment')
const user = require('./user')
const captchar = require('./captcha')
// const container = require('./container')
const fs = require("fs")
const path = require("path")

const router = new Router()

// 同构页面
// router.use(container.routes(), container.allowedMethods())

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

