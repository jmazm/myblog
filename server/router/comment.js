const Router = require("koa-router")
const commentCtrl = require('../controllers/comment')
const { csrfAuth } = require("../tools/auth")

const router = new Router()

// 获取文章
router.get('/comment', commentCtrl.getComments)


// 添加文章
router.post('/comment', commentCtrl.addComment)


// 删除文章
// router.del('/v1/admin/article/:id', commentCtrl.delArticle)



module.exports = router


