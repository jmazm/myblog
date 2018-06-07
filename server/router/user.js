const Router = require("koa-router")
const userCtrl = require("../controllers/user")

const router = new Router()

router.post('/login', userCtrl.login)

module.exports = router