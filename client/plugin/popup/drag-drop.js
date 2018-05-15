import {on, off, getEvent, getTarget} from '../../lib/event'
import {throttle} from '../../lib/timer'
/**
 * // === 单例模式：保证一个类仅有一个实例，并提供一个访问它的全局访问点（就是一个对外的接口） === //

 * // === 事件委托：利用事件冒泡将事件处理程序的调用交给上级去做=== //

 * // ===
 * clientX（水平）、clientY（垂直）: 鼠标事件对象的属性
 * ===//

 * // ===
 * offsetParent: 只读，返回最近的定位包含块元素。如果元素没有定位，offsetParent 就是 the nearest table, table cell or root element（html是标准，body是怪异模式）
 * offsetLeft: 只读，返回元素相对于offsetParent节点的left值；
 * offsetTop：只读，返回元素相对于offsetParent节点的top值；
 * 上面三个属性，如果元素是隐藏的（父元素或者元素本身设置了display:none）或者元素本身设置了position: fixed，则返回null
 * ie9：元素本身设置了position: fixed，则返回null，display:none并不会影响
 * ===//

 * // ===
 *  attribute 和 property的区别：
 *  1、attribute是由HTML定义（即使是自定义属性），并不存在于DOM中；property属于DOM（document.getElementById('test').foo = 1）
 *  2、attribute是String类型；property是任意类型
 *
 *  attribute 和 property的关系：
 *  1、非自定义的attribute，如id、title等，都可以通过 节点.property名 访问
 *  2、非自定义的property或者attribute的变化都是联动（<div id="test" class="button"></div>  div.getAttribute('class')  div.setAttribute('class','green-input')）
 *  3、带默认值的attribute不随property变化而变化：input元素的value就是一个默认值，input.value = 'foo2'; input.getAttribute('value'); // 返回string："foo"
 *
 *  最佳实践：
 *  1、使用JavaScript操作property更为方便、快捷，并且property支持各种不同的类型，尤其是对于布尔类型的attribute的自动转换
 *  2、自定义属性使用attribute
 *
 *  注意：
 *  1、由于 class 为JavaScript的保留关键字，所以通过property操作class时应使用 className。
 * === //
 */

/**
 * 拖放
 * // === 思路：三个事件、两个鼠标坐标、两个偏移量 === //
 * // ===
 *  1、onmousedown：选择元素
 *     onmousemove：移动元素
 *     onmouseup：释放元素，删除mousedown、mousemove、mouseup的相关事件
 * === //
 * // ===
 *  2、保证对象在移动的时候，鼠标不会自己走位，因此需要计算距离：
 *  a、在onmousedown时，计算鼠标到对象左上角的距离，并存变量里：diffX = e.clientX - ele.offsetLeft; diffY = e.clientY - ele.offsetTop;
 *  b、在onmousemove的时候，再使用diffX 和 diffY给元素进行定位：dragging.style.left = e.clientX - diffX; dragging.style.top = e.clientY - diffY;
 * === //
 */
const DragDrop = (function () {

  let dragging = null
  let diffX = 0
  let diffY = 0

  function handleEvent (e) {
    // 获取事件和目标
    let ev = getEvent(e)
    const target = getTarget(ev)
    let $wrapper = this.$wrapper


    // 确定事件类型
    switch (ev.type) {
      case 'mousedown':
        if (target.getAttribute('jm-drag')) {
          dragging = target
          console.log(this)

          diffX = ev.clientX - $wrapper.offsetLeft
          diffY = ev.clientY - $wrapper.offsetTop
        }
        break
      case 'mousemove':
        if (dragging !== null) {
          $wrapper.style.left = ev.clientX - diffX + 'px'
          $wrapper.style.top = ev.clientY - diffY + 'px'
        }
        break
      case 'mouseup':
        dragging = null
        break
    }
  }

  return {
    enable: function () {
      on(document, 'mousedown', handleEvent.bind(this))
      on(document, 'mousemove', throttle(handleEvent.bind(this), 100))
      on(document, 'mouseup', handleEvent.bind(this))

      return this
    },
    disable: function () {
      off(document, 'mousedown', handleEvent)
      off(document, 'mousemove', handleEvent)
      off(document, 'mouseup', handleEvent)

      return this
    }
  }
})()

export default DragDrop