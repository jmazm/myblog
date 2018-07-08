import {inheritProto} from '../../../lib/inheritProto'
import {on} from '../../../lib/event'
import Popup from './popup'

/**
 * 寄生组合继承
 * // ===
 * 1. 在子类构造函数中调用 parent.call(this, ...args)，继承父类的属性
 * 2. 调用 inheritProto方法，继承父类原型上的方法
   function inheritProto (parent, child) {
    const proto = Object.create(parent.prototype)
    proto.constructor = child
    child.prototype = proto
}
 * === //
 */

/**
 * 警告框
 * @constructor
 */
function Alert () {
  // 继承父类的属性
  Popup.call(this)
}

inheritProto(Popup, Alert)

Alert.prototype.setFooter = function () {
  const doc = document
  const frag = doc.createDocumentFragment()

  const $sureBtn = doc.createElement('button')
  $sureBtn.type = 'button'
  $sureBtn.className = `sure-btn`
  $sureBtn.textContent = '确认'

  // 绑定事件
  on($sureBtn, 'click', this.close.bind(this))

  frag.appendChild($sureBtn)
  this.$footer.appendChild(frag)

  return this
}

/**
 * 使用单例模式
 */
export const alert = (function () {
  let instance
  return function (content) {
    console.log(content)
    if (instance) {
      // 打开提示框
      instance
        .setContent(content)
        .open()
      return instance
    }

    instance = new Alert()
    instance
      .setStyle()
      .createBaseHtml()
      .setHeader('alert')
      .setFooter()
      .move()
      .setContent(content)
  }
})()


