const Router = require("koa-router")
const fs = require("fs")
const path = require("path")
const articleCtrl = require('../controllers/article')
const categoryCtrl = require("../controllers/category")
const commentCtrl = require('../controllers/comment')
const tagCtrl = require("../controllers/tag")
const userCtrl = require("../controllers/user")
const { userAuth } = require("../tools/auth")
const captcha = require("../tools/captcha")


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

router.get('/', async (ctx) => {
  const data = await fs.readFileSync(path.resolve(process.cwd(), './dist/cms/index.html'), 'utf8')

  ctx.body = data
})


// 获取验证码
router.get('/api/captcha', captcha.createCaptcha)

// 获取文章
router.get('/api/article', articleCtrl.getArticle, userAuth)
// 获取文章详情
router.get('/api/article/:id', articleCtrl.getArticleDetail, userAuth)
// 添加文章
router.post('/api/article', articleCtrl.addArticle, userAuth)
// 修改文章
router.put('/api/article', articleCtrl.modifyArticle, userAuth)
// 删除文章
router.delete('/api/article/:id', articleCtrl.delArticle, userAuth)



// 类别
router.get('/api/category', categoryCtrl.getCategories, userAuth)
router.post('/api/category', categoryCtrl.addCategory, userAuth)
router.delete('/api/category/:id', categoryCtrl.delCategory, userAuth)


// 获取评论
router.get('/api/comment', commentCtrl.getComments)

// 标签
router.get('/api/tag', tagCtrl.getTags, userAuth)
router.post('/api/tag', tagCtrl.addTag, userAuth)
router.delete('/api/tag/:id', tagCtrl.delTag, userAuth)

// 登录
router.post('/api/login', userCtrl.login)
// 注销
router.get('/api/logout', userCtrl.logout)

module.exports = router

