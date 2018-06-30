const Router = require("koa-router")
const articleCtrl = require('../controllers/article')
const categoryCtrl = require("../controllers/category")
const commentCtrl = require('../controllers/comment')
const tagCtrl = require("../controllers/tag")
const { userAuth } = require("../tools/auth")


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
const router = new Router()

// 同构
router.get('/', require("../containers/home").index)
router.get('/article/:articleId', require("../containers/articleDetail").index)
router.get('/category', require("../containers/category").index)
router.get('/tag', require("../containers/tag").index)

// {"status":"failure","msg":"Cannot read property 'params' of undefined"}
// 因此，xxx.defaultProps.match.params = {}，即this.props.match.params要设置默认值
router.get('/search/:title', require("../containers/searchList").index)
router.get('/tag/:tag/article', require("../containers/tagList").index)
router.get('/category/:category/article', require("../containers/categoryList").index)


// 获取文章
router.get('/api/article', articleCtrl.getArticle)
// 获取文章详情
router.get('/api/article/:id', articleCtrl.getArticleDetail)


// 类别
router.get('/api/category', categoryCtrl.getCategories)

// 获取评论
router.get('/api/comment', commentCtrl.getComments)
// 添加评论
router.post('/api/comment', commentCtrl.addComment)

// 标签
router.get('/api/tag', tagCtrl.getTags)


module.exports = router

