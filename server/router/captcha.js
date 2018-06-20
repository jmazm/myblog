const Router = require("koa-router")
const captcha = require("../tools/captcha")


const router = new Router()

// 获取验证码
router.get('/captcha', captcha.createCaptcha)

module.exports = router