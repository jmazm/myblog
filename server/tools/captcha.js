const captcha = {}
const cache = {}

/**
 * 创建验证码
 * @param ctx
 */
captcha.createCaptcha = function (ctx) {
  const ccap = require("ccap")
  const cpt = ccap()
  const data = cpt.get()
  const txt = data[0]
  const number = data[1]
  captcha.setCaptcha(ctx.cookies.get('U_ID'), txt)
  ctx.accepts(['image/webp','image/apng','image/*','*/*;q=0.8'])
  ctx.body = number
}

/**
 * 设置验证码
 * @param uId
 * @param captchar
 */
captcha.setCaptcha = function (uId, captchar) {
  cache[uId] = captchar
}

/**
 * 获取验证码
 * @param uId
 * @return {*}
 */
captcha.getCaptcha = function (uId) {
  if (!cache[uId]) {
    return
  }
  return cache[uId]
}

module.exports = captcha