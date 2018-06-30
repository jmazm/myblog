/**
 * 密码安全
 * // ===
 * 1. 密码作用：证明你就是你
 * 2. 泄露渠道：数据库被偷, 服务器被入侵, 通讯被窃听, 内部人员泄露数据, 其它网站(撞库)
 * 3. 哈希算法特点
   3.1 明文与密文一一对应
   3.2 雪崩效应：差一个字符就会差别很大
   3.3 密文和明文间无法逆推
   3.4 密文固定长度
 * 4. 常见hash算法：md5、sha1、sha256
 * 5. 密码存储安全性
   5.1 严禁明文存储 - 防泄漏
   5.2 单向变化 - 防泄漏
   5.3 变化复杂度要求 - 防猜解，比如 `md5(sha256(sha1(明文))) = 密文` ==》 哈希后再哈希 来防止 单向变换彩虹表
   5.4 密码复杂度要求 - 防猜解
   5.5 加盐 - 防猜解
 * 6. 密码传输安全性
   6.1 https传输
   6.2 频率限制 - 防猜解
   6.3 前端加密 - 防撞库，即原始密码不被拿到，这样在其它网站若用了相同的账号和密码也有保障
 * 7. 生物密码
   7.1 种类：指纹 / 虹膜 / 唇纹 / 脸部识别
   7.2 缺点：唯一性及不可变性，使得一旦被破解或者仿照则会发生永久失效
 * 8. 总结
   8.1  前端需要hash加密，为的是即使在传输过程被监听到也只是拿到加密的密码，而非原码，
       而加密不可逆，虽然黑客可以照样拿着密码去登录此网站，但是等不了其它网站，因为加密方式不同
   8.2 而到了后端，需要先check下此账号是否存在，存在的话再将此账号用户的盐与传过来的密码进行加密，
      得出来的密码去与数据库中的密码对比是否一致，这样做的目的是增加复杂度，即使被盗库，黑客也拿不到原密码
   8.3 加密的目的只是**最大程度地不让黑客即使拿到密码也破解不出原密码
 * === //
 */

const jsonWebToken = require("jsonwebtoken")
const UserModel = require("../models/user")
const Password = require("../tools/password")
const crypt = require("../tools/crypt")
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
    // refererAuth(ctx)

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


    let { id }  = userData

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
        expiresIn: '1h'
      }
    )

    // 重置登录次数
    loginTotal = 0

    ctx.body = {
      status: 'success',
      accessToken: accessToken
    }
  }

  /**
   * 注销
   * @param ctx
   * @return {Promise.<void>}
   */
  static async logout (ctx) {
    // 删除相应的cookie
    ctx.cookies.set('U_ID', '', {
      maxAge: 0
    })

    ctx.cookies.set('USER_SIGN', '', {
      maxAge: 0
    })

    ctx.cookies.set('CSRF_TOKEN', '', {
      maxAge: 0
    })

    ctx.body = {
      status: 'success'
    }
  }
}



module.exports = User