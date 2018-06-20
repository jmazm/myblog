const Router = require("koa-router")
const userCtrl = require("../controllers/user")

const router = new Router()

// 登录
router.post('/login', userCtrl.login)
// 注销
router.get('/logout', userCtrl.logout)

module.exports = router