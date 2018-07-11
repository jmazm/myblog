import {inheritProto} from '../../../lib/inheritProto'
import {on} from '../../../lib/event'
import Popup from './popup'

/**
 * this: 指向执行上下文
 * // ===
 * 1. call/apply/bind：改变函数执行时的上下文，即this的指向
   1.1 区别
     1.1.a call(执行上下文, 参数1, 参数2, ...) - 逐个参数传递，并且会调用函数
     1.1.b apply(执行上下文, [参数1, 参数2, ...]) - 参数是以数组形式传递，并且会调用函数
     1.1.c fn.bind(执行上下文) - 只是改变执行上下文，并不会调用执行上下文
   1.2 应用
     1.2.a 求最值  Math.min.apply(null, heightArr)
     1.2.b 将伪数组转化为数组: [].slice.call({0: 'eee', 1: 'fee'})
          【伪数组: 数据结构为以数字为下标, 且有length属性】
 * 2. 箭头函数： () => {}
   2.1 特点
     2.1.a 参数加括号，只有一个参数可以不添加
     2.1.b 返回值为对象需要加括号，没有返回值就void
     2.1.c 没有this, 所以this为外层代码块的this, 没有this则不可用作构造函数, 关于this的特点都没用
     2.1.d 没有arguments, super, new.target, 函数体内需用rest参数代替arguments
     2.1.e 不能用作Generator函数
   2.2 用途
     2.2.a this指向固定化
     2.2.b 简化回调: [1, 2, 3].map(x => x * x)
     2.2.c 多重箭头函数
 * 3. 双冒号运算符： 箭头函数可绑定this对象, 大大减少了显示地绑定(call, apply, bind), 但并非使用所有场景, 而es7中的function bind syntax可以用来取代
   3.1 语法：函数绑定运算符是并排的两个冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面
   3.2 特性：
     3.2.a 如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面
     3.2.b 如果双冒号运算符的运算结果，还是一个对象，就可以采用链式写法
 * === //
 */

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


