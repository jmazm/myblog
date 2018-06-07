const Router = require("koa-router")
const commentCtrl = require('../controllers/comment')

const router = new Router()

// 获取文章
router.get('/comment', commentCtrl.getComments)

// 获取文章详情
// router.get('/v1/article/:id', commentCtrl.getArticleDetail)

// 添加文章
router.post('/comment', commentCtrl.addComment)

// 修改文章
// router.put('/v1/article', commentCtrl.modifyArticle)

// 删除文章
// router.del('/v1/admin/article/:id', commentCtrl.delArticle)



module.exports = router


