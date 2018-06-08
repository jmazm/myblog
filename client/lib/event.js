/**
 * 添加事件
 * // === 思路 === //
 * // === 兼容 === //
 * // === 1、DOM2级：ie(attachEvent) 非ie(addEventListener)=== //
 * // === 2、DOM0级：onxxx === //
 * @param {Node} node 元素
 * @param {String} type 类型
 * @param {Function} handler 事件处理程序
 * @param {Boolean} useCap 是否捕获（true:捕获 false:冒泡）
 */
export function on (node, type, handler, useCap = false) {
  // DOM2：非ie
  if (node.addEventListener) {
    node.addEventListener(type, handler, useCap)
  }
  // DOM2：ie
  else if (node.attachEvent) {
    node.attachEvent(`on${type}`, handler)
  }
  // DOM0
  else {
    node[`on${type}`] = handler
  }
}

/**
 * 删除事件
 * // === 思路 === //
 * // === 兼容 === //
 * // === 1、DOM2级：ie(detachEvent) 非ie(removeEventListener)=== //
 * // === 2、DOM0级：onxxx = null === //
 * @param {Node} node 元素
 * @param {String} type 类型
 * @param {Function} handler 事件处理程序
 * @param {Boolean} useCap 是否捕获（true:捕获 false:冒泡）
 */
export function off (node, type, handler,  useCap = false) {
  // DOM2：非ie
  if (node.removeEventListener) {
    node.removeEventListener(type, handler, useCap)
  }
  // DOM2：ie
  else if (node.detachEvent) {
    node.attachEvent(`on${type}`, handler)
  }
  // DOM0
  else {
    node[`on${type}`] = null
  }
}

/**
 * 获取事件对象
 * // === 兼容：ie(window.event) === //
 * @param e
 * @return {*|Event}
 */
export function getEvent (e) {
  return e || window.event
}

/**
 * 获取实际触发事件的目标元素
 * // === 区别：e.currentTarget - 永远是注册事件处理程序的元素 === //
 * // === 兼容性：ie - e.srcElement === //
 * @param {Object} e
 * @return {Object}
 */
export function getTarget (e) {
  return e.target || e.srcElement
}

/**
 * 阻止默认事件
 * // === 兼容性：ie - e.returnValue = true === //
 * @param e
 */
export function preventDefault (e) {
  if (e.preventDefault) {
    e.preventDefault()
  } else {
    e.returnValue = true
  }
}

/**
 * 阻止冒泡
 * // === 兼容性：ie - e.cancelBubble = true === //
 * // === 区别：stopImmediatePropagation - 若按顺序地添加了多个事件处理程序，某一个调用后，之后的事件处理程序都无效了 === //
 * @param e
 */
export function stopPropagation (e) {
  if (e.stopPropagation) {
    e.stopPropagation()
  } else {
    e.cancelBubble = true
  }
}