const Router = require("koa-router")
const fs = require("fs")
const path = require("path")

const router = new Router()

// 主要处理刷新页面的时候，NOT FOUND 的问题
router.get(/\/admin\/.*/, function (ctx) {
  const indexUrl = path.resolve(process.cwd(), 'dist/index.html')
  const data = fs.readFileSync(indexUrl, 'utf8')
  ctx.set('Content-Type', 'text/html')
  ctx.body = data
})

router.get('/', require("../containers/home").index)
router.get('/article/:articleId', require("../containers/articleDetail").index)

module.exports = router