const Router = require("koa-router")
const articleCtrl = require('../controllers/article')
const {userAuth, csrfAuth} = require("../tools/auth")

const router = new Router()

// 获取文章
router.get('/article', articleCtrl.getArticle)

// 获取文章详情
router.get('/article/:id', articleCtrl.getArticleDetail)

// 添加文章
router.post('/article', articleCtrl.addArticle, userAuth)

// 修改文章
router.put('/article', articleCtrl.modifyArticle)

// 删除文章
router.del('/article/:id', articleCtrl.delArticle)



module.exports = router


