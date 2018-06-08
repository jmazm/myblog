export const reg = {
  /**
   * html实体转义
   * @param html
   * @return {*}
   */
  replaceHtml: (html) => {
    if (html === '') {
      return ''
    }
    html.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/, '&#39;')
    return html
  },
  /**
   * javascript转义
   * @param html
   * @return {*}
   */
  replaceJavaScript: (html) => {
    if (html === '') {
      return ''
    }
    html.replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/'/g, '\\')
     
    return html
  }
}

let strategies = {
  /**
   * 判断不为空
   * @param value
   * @param errorMsg
   * @return {*}
   */
  isEmpty (value, errorMsg) {
    let len = value.trim().length
    if (len === 0) {
      return errorMsg
    }
  },

  /**
   * 判断邮箱
   * @param value
   * @param errorMsg
   * @return {*}
   */
  isEmail (value, errorMsg) {
    const reg = /^[a-zA-Z\d][\w\.-]{3,17}@[a-zA-Z\d][\w\.-]+\.[a-z]{2,5}$/g
    if (!reg.test(value)) {
      return errorMsg
    }
  },
  /**
   * 判断是否为网址
   * @param value
   * @param errorMsg
   * @return {*}
   */
  isWebsite (value, errorMsg) {
    const reg = /^https?:\/\/[^\s]+$/
    if (!reg.test(value)) {
      return errorMsg
    }
  }
}

export class Validator {
    constructor () {
      this.cache = []
    }

  /**
   * 添加校验规则
   * @param formEle
   * @param rules
   */
    add (formEle, rules) {
      for (let rule of rules) {
        let strategyArray = rule.strategy.split(':')
        let errorMsg = rule.errorMsg

        this.cache.push(() => {
          let strategy = strategyArray.shift()
          strategyArray.unshift(formEle.value.trim())
          strategyArray.push(errorMsg)
          return strategies[strategy].apply(formEle, strategyArray)
        })
      }
    }

  /**
   * 启动校验
   * @return {*}
   */
  start () {
      for (let validatorFunc of this.cache) {
        const errorMsg = validatorFunc()
        if (errorMsg) {
          return errorMsg
        }
      }
    }
}
