const jsonWebToken = require("jsonwebtoken")
const UserModel = require("../models/user")
const Password = require("../tools/password")
const crypt = require("../tools/crypt")
const {cmsRefererAuth} = require("../tools/auth")
const captcha = require("../tools/captcha")
const config = require("../../config")

let loginTotal = 0

class User {
  /**
   * 登录
   * // ===
   *  思路：
   *  1、referer验证
   *  2、判断用户是否存在，存在，则设置 cookie - U_ID（用户ID，用来校验的）；不存在，则返回登录失败的信息，状态码为200
   *  3、当登录次数 >= 3 时，仍登录失败，就需要进行验证码验证
   *  4、用户密码校验
   *  【密码加盐操作 - 创建用户的时候，添加盐，密码在加盐的基础上，再进行md5加密，所以存储到数据库中的密码，并不是单纯的md5加密后的密码】
   *  【密码md5加密 - cryto - createHash + update + digest】
   *  5、设置cookie - USER_SIGN - crypto模块 - createCipher 和 createDecipher ==> update + final
   *  6、添加 csrf_token - 随机字符串
   *  7、添加 access_token - jsonwebtoken模块
   *  8、登录成功，重置登录次数 - loginTotal=0
   * @return {Promise.<void>}
   */
  static async login (ctx) {
    const postData = ctx.request.body

    // referer验证
    cmsRefererAuth(ctx)

    // 判断用户是否存在
    const userData = await UserModel.get(postData.name)

    if (!userData) {
      ctx.body = {
        status: 'failure',
        msg: 'USER DOES NOT EXIST',
        loginTotal: loginTotal
      }
      return
    }


    let {id} = userData

    // 设置cookie - id
    ctx.cookies.set('U_ID', id, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1h
    })

    // 验证码判断
    /**
     * 思路：
     * 1、当登录次数大于等于3时，都还没登录成功，就需要验证码验证。
     * 2、通过比较客户端传来的captcha以及早已存储在内存中的captcha作比较，
     *    如果校对失败，则返回403
     */
    if (loginTotal >= 3) {
      const capt = captcha.getCaptcha(id)
      console.log(capt , postData.captcha)
      if (!postData.captcha || capt !== postData.captcha) {
        ctx.response.status = 401
        ctx.body = {
          status: 'failure',
          msg: 'NO CAPTCHA OR CAPTCHA DOES NOT MATCH',
          loginTotal: loginTotal
        }
        return
      }
    }

    let {name, password, sault}  = userData

    // 用户密码判断
    const encryptedPsw = Password.encryptPassword(sault, postData.password)
    if (encryptedPsw !== password) {
      loginTotal++
      ctx.body = {
        status: 'failure',
        msg: 'PASSWORD WRONG',
        loginTotal: loginTotal
      }
      return
    }

    // 设置cookie - sign
    ctx.cookies.set('USER_SIGN', crypt.encrypt(id), {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1h
    })

    // 添加 csrf token
    const csrfToken = parseInt(Math.random() * 999999999, 10)
    ctx.cookies.set('CMS_CSRF_TOKEN', csrfToken, {
      httpOnly: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1h
    })

    // 通过模块jsonwebtoken.sign方法添加 access token
    // jwt.verify(token, secretOrPublicKey, [options, callback])
    const accessToken = jsonWebToken.sign({
        id: id,
        name: name
      }, config.auth.CMS_ACCESS_TOKEN, {
        expiresIn: '188h'
      }
    )

    // 重置登录次数
    loginTotal = 0

    ctx.body = {
      status: 'success',
      accessToken: accessToken
    }
  }
}



module.exports = User