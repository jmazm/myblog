const Router = require("koa-router")
const captcha = require("../tools/captcha")


const router = new Router()

router.get('/captcha', captcha.createCaptcha)

module.exports = router