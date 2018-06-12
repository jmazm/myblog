const Router = require("koa-router")
const userCtrl = require("../controllers/user")

const router = new Router()

router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)

module.exports = router