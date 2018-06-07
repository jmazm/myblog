const crypt = require("./crypt")
const jsonwebtoken = require("jsonwebtoken")
const config = require("../../config")

exports.userAuth =  async function (ctx) {
  try {
    // referer验证
    await _refererAuth(ctx)

    // csrf token验证
    await _csrfAuth(ctx)

    // 登录验证
    await _accessAuth(ctx)

  } catch (err) {
    let code = err.status || err.statusCode || 500
    let msg = err.message
    if (/TokenExpiredError|JsonWebTokenError/.test(err.name)) {
      code = 401
    }
    ctx.throw(code, msg)
  }
}

exports.csrfAuth = async function (ctx, next) {
  _csrfAuth(ctx)
}

exports.refererAuth =  async function (ctx) {
  _refererAuth(ctx)
}

/**
 * csrf token 验证
 * @param ctx
 * @private
 */
function _csrfAuth (ctx) {
  // 获取用户传来的csrf token
  const csrfToken = ctx.request.body.csrfToken || ctx.query.csrfToken || ctx.headers['x-csrf-token']
  // 获取cookie中存储的csrf token
  const c_csrfToken = ctx.cookies.get('CSRF_TOKEN')

  // csrfToken不存在 或者 c_csrfToken不存在 或者 csrfToken与c_csrfToken不想等，则抛出错误
  if (!csrfToken || !c_csrfToken || csrfToken !== c_csrfToken) {
    ctx.throw(403, 'FORBIDDEN: NO CSRF_TOKEN')
  }
}

/**
 * referer验证
 * @param ctx
 * @private
 */
function _refererAuth (ctx) {
  // referer 验证
  if (!/^https?:\/\/127\.0\.0\.1:8080/.test(ctx.headers['referer'])) {
    ctx.throw(403, 'FORBIDDEN: REFERER WRONG')
  }
}

/**
 * 登录验证
 * @param ctx
 * @private
 */
function _accessAuth (ctx) {
  // 获取 access token 的渠道：query/body/x-access-token
  // const accessToken = ctx.request.body.accessToken || ctx.query.accessToken || ctx.headers['x-access-token']
  let accessToken = ctx.headers['authorization'] ? ctx.headers['authorization'].split(' ')[1] : ''

  // 解码access token
  let d_accessToken = jsonwebtoken.verify(accessToken, config.auth.CMS_ACCESS_TOKEN)

  if (!(d_accessToken && d_accessToken.exp * 1000 > Date.now())) {
    ctx.throw(401, 'jwt is expired')
  }

  // 获取 cookie USER_SIGN
  const userSign = ctx.cookies.get('USER_SIGN')

  // 解码 cookie USER_SIGN，获取用户id
  const d_id = parseInt(crypt.decrypt(userSign))
  if (!accessToken || !d_accessToken || d_accessToken.id !== d_id) {
    ctx.throw(401, 'UNAUTHORIZED: NO ACCESS AUTHRIZATION')
  }
}