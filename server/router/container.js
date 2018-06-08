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

// 这里的参数要与client中的router中的一样
router.get('/', require("../containers/home").index)
router.get('/article/:articleId', require("../containers/articleDetail").index)
router.get('/category', require("../containers/category").index)
router.get('/tag', require("../containers/tag").index)

// {"status":"failure","msg":"Cannot read property 'params' of undefined"}
// 因此，xxx.defaultProps.match.params = {}，即this.props.match.params要设置默认值
router.get('/search/:title', require("../containers/searchList").index)
router.get('/tag/:tag/article', require("../containers/tagList").index)
router.get('/category/:category/article', require("../containers/categoryList").index)

module.exports = router