const crypt = require("./crypt")
const jsonwebtoken = require("jsonwebtoken")
const config = require("../../config")

/**
 * 用户登录验证
 * // ===
 * 1、referer验证
 * 2、csrf_token验证
 * 3、access_token验证
 * === //
 * @param ctx
 */
export function userAuth (ctx) {
  try {
    // referer验证
    _cmsRefererAuth(ctx)

    // csrf token验证
     _csrfAuth(ctx)

    // 登录验证
     _accessAuth(ctx)

  } catch (err) {
    let code = err.status || err.statusCode || 500
    let msg = err.message
    if (/TokenExpiredError|JsonWebTokenError/.test(err.name)) {
      code = 401
    }
    ctx.throw(code, msg)
  }
}

export async function csrfAuth (ctx, next) {
  _csrfAuth(ctx)
}

// 在开发环境中，refer的校验依然为：cms的端口为3003， index的端口为3000
// 尽管服务器的的端口为3001，但是webpack-dev-server中的proxy代理，
// 能帮我们将相应的请求的地址由3000端口或者3003端口指向3001端口，
// 所以就不存在预检请求（cors）

export async function indexRefererAuth (ctx) {
  _indexRefererAuth(ctx)
}

export async function cmsRefererAuth (ctx) {
  _cmsRefererAuth(ctx)
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
 * cms的referer验证
 * @param ctx
 * @private
 */
function _cmsRefererAuth (ctx) {
  if (!/^https?:\/\/127\.0\.0\.1:3003/.test(ctx.headers['referer'])) {
    ctx.throw(403, 'FORBIDDEN: REFERER WRONG')
  }
}


/**
 * index的referer验证
 * @param ctx
 * @private
 */
function _indexRefererAuth (ctx) {
  if (!/^https?:\/\/127\.0\.0\.1:3000/.test(ctx.headers['referer'])) {
    ctx.throw(403, 'FORBIDDEN: REFERER WRONG')
  }
}

/**
 * 登录验证
 * // ===
 * access_token存储的就是用户名以及用户Id
 * === //
 * @param ctx
 * @private
 */
function _accessAuth (ctx) {
  // 获取 access token 的渠道：query/body/x-access-token
  // const accessToken = ctx.request.body.accessToken || ctx.query.accessToken || ctx.headers['x-access-token']
  let accessToken = ctx.headers['authorization'] ? ctx.headers['authorization'].split(' ')[1] : ''

  // 通过模块jsonwebtoken 中的verify方法，解码access token
  // jwt.sign(payload, secretOrPrivateKey, [options, callback])
  let d_accessToken = jsonwebtoken.verify(accessToken, config.auth.CMS_ACCESS_TOKEN)

  // 判断拿过来的 access_token是否有过期 - 将token.exp属性和Date.now()作比较，过期了，就直接抛出401
  // 记得exp是秒，而Date.now()是ms，要么jwt.exp * 1000 或者 Date.now / 1000
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