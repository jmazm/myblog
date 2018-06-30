import {on} from '../../../lib/event'
import Popup from './popup'

/**
 * 原型链继承
 * 实现方式：hild.prototype = new Parent()
 * 缺点：
 * 1、共享问题
 * 2、constructor的指向问题
 * 3、无法传递参数
 */

/**
 * 借用构造函数继承
 * 实现方式：Parent.call(this, args)
 * 缺点：
 * 1、无法继承原型链上的方法和属性
 */

/**
 * 下面用到组合继承
 * 缺点：
 * 1、两次调用父类的构造函数（第一次调用：在子类的构造函数里调用 - Parent.call(this)，继承父类的属性； 第二次调用：继承父类的方法 - child.prototype = new Parent()）
 * 2、需要修正子类原型对象的constructor属性的值
 */

/**
 * 提示框
 * @constructor
 */

function Prompt () {
  // 继承父类的属性
  Popup.call(this)
}

// 继承方法
Prompt.prototype = new Popup()
// 修正子类的constructor
Prompt.prototype.constructor = Prompt

Prompt.prototype.setFooter = function () {
  const doc = document
  const frag = doc.createDocumentFragment()

  const $sureBtn = doc.createElement('button')
  $sureBtn.type = 'button'
  $sureBtn.className = `sure-btn`
  $sureBtn.textContent = '确认'

  const $cancelBtn = doc.createElement('button')
  $cancelBtn.type = 'button'
  $cancelBtn.className = `cancel-btn`
  $cancelBtn.textContent = '取消'

  const $input = doc.createElement('input')
  $input.type = 'text'
  $input.className = `popup-input`

  const handleSure = () => {
    this.close.call(this)
    return $input.value
  }
  const handleCancel = () => {
    this.close.call(this)
    return null
  }

  // 绑定事件
  on($sureBtn, 'click', handleSure)
  on($cancelBtn, 'click', handleCancel)

  frag.appendChild($input)
  frag.appendChild($sureBtn)
  frag.appendChild($cancelBtn)
  this.$footer.appendChild(frag)

  return this
}


export function prompt (content) {
  let prompt = new Prompt()

  prompt
    .setStyle()
    .createBaseHtml()
    .setHeader('prompt')
    .setFooter()
    .move()
    .setContent(content)
  prompt.open = prompt.open.bind(prompt)

  return prompt
}


