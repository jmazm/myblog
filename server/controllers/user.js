const jsonWebToken = require("jsonwebtoken")
const UserModel = require("../models/user")
const Password = require("../tools/password")
const crypt = require("../tools/crypt")
const {refererAuth} = require("../tools/auth")
const captcha = require("../tools/captcha")
const config = require("../../config")

let loginTotal = 0

class User {
  /**
   * 登录
   * @param ctx
   * @return {Promise.<void>}
   */
  static async login (ctx) {
    const postData = ctx.request.body

    // referer验证
    refererAuth(ctx)

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


    let {id}  = userData

    // 设置cookie - id
    ctx.cookies.set('U_ID', id, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1h
    })

    // 验证码判断
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
    ctx.cookies.set('CSRF_TOKEN', csrfToken, {
      httpOnly: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1h
    })

    // 添加 access token
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
      // csrfToken: csrfToken
    }
  }
}



module.exports = User