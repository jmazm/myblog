import React, { Component } from 'react'
import md5 from 'js-md5'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'

import { postRequest, api } from '../../../../fetch/fetch'

import style from './style.css'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loginTotal: 0,
      captUrl: api.getCaptchaApi
    }

    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate
    this.captClickHandler = this.captClickHandler.bind(this)
    this.loginHandle = this.loginHandle.bind(this)
  }

  /**
   * 登录
   * @return {Promise.<void>}
   */
  async loginHandle () {
    const form = this.form
    const KEY = `a1&890AJN-=+O2,X`
    const name = form.username.value.trim()
    const password = md5(`${ name }${ KEY }${ form.password.value.trim() }`)
    const captcha = form.captcha? form.captcha.value.trim() : ''

    // ajax 请求
    const result = await postRequest(api.adminLoginApi, {
      name,
      password,
      captcha
    })

    // 响应
    if (result.status === 'success') {
      const accessToken = result.accessToken
      localStorage.setItem('ACCESS_TOKEN', accessToken)
      // 重定向
      location.href = '/#/admin/newArticle'
    } else {
      alert(result.msg)
      // 获取登录的次数
      this.setState({
        loginTotal: result.loginTotal
      })
    }
  }

  /**
   * 获取验证码
   * @return {Promise.<void>}
   */
  async captClickHandler () {
    this.setState({
      captUrl: api.getCaptchaApi + `?id=${ Math.random() * 20 }`
    })
  }

  render () {
    const { loginTotal, captUrl } = this.state
    return (
      <div className={ style['login-wrapper'] }>
        <div className={ style['login-header'] }>
          <h2 className={ style['header-ti'] }>张静宜个人前端博客cms登录</h2>
        </div>
        <form className={ style['login-form'] } ref={ ele => this.form = ele }>
          <label htmlFor="username" className={ style["form-label"] }>
            <input type="text" className={ style["form-input"] } id="username" name="username" placeholder="用户名"/>
          </label>
          <label htmlFor="password" className={ style["form-label"] }>
            <input type="password" className={ style["form-input"] } id="password" name="password" placeholder="密码"/>
          </label>
          {
            loginTotal >= 3 ?
              <div className={ style['captcha-wrapper'] }>
                <img src={captUrl} alt="captcha" onClick={ this.captClickHandler }/>
                <label htmlFor="captcha" className={ style["form-label"] }>
                  <input type="text" className={ style["form-input"] } id="captcha" name="captcha" placeholder="验证码"/>
                </label>
              </div> :
              null
          }

          <div className={ style['login-tool-bar'] }>
            <button className={ style.btn } type="button" onClick={ this.loginHandle }>登录</button>
          </div>
        </form>
      </div>
    )
  }
}

module.exports = Login