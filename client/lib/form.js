/**
 * 策略模式 - 例子（表单验证）
 * // ===
 * 1. 定义：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
 * 2. 目的：将算法的使用与算法的实现分离开来
 * 3. 组成：
   3.1 第一部分一组策略类（如下面的strategies对象），策略类封装了具体的算法，并负责具体的计算过程
   3.2 第二个部分是环境类 Context，Context 接受客户的请求，随后把请求委托给某一个策略类。
 * 4. 多态在策略模式中的体现
 *   strategies负责封装各自的算法，Validator类则对策略对象发出表单验证的请求，他们
 *   会返回各自不同的表单验证结果，这就是对象多态性的表现。
 * 5. 优点：
   5.1 利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句，例如 if...else if ... else if ... else
   5.2 提供了对开放—封闭原则的完美支持，将算法封装在独立的 strategy 中，使得它们易于切换，易于理解，易于扩展。
   5.3 算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作
   5.4 在策略模式中利用组合和委托来让 Context 拥有执行算法的能力，这也是继承的一种更轻便的替代方案。
 * === //
 */

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
   * @param {Object} formEle - 表单元素
   * @param {Array} rules - 校验规则
   * @example [
   *  {
   *    strategy:'isEmpty/minLength:6'
   *    errorMsg: ''
   *  }
   * ]
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
