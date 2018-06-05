const Router = require("koa-router")
const commentCtrl = require('../controllers/comment')
const {csrfAuth} = require("../tools/auth")

const router = new Router()

// 获取评论
router.get('/comment', commentCtrl.getComments)

// 添加评论
router.post('/comment', commentCtrl.addComment, csrfAuth)





module.exports = router


