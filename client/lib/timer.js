/**
 * Date常用方法
 * Date.now(): 返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数，相当于 Unix 时间戳乘以1000。
 * +new Date(): 相当于Date.now()
 */

/**
 * 节流函数
 * // ===
 *  核心思想：设置固定的函数执行速率，从而降低频繁事件回调的执行次数
 *  （即：某个函数在某个时间段内只能执行一次 -- 匀速执行）
 * === //
 * @param fn
 * @param delay
 * @return {Function}
 */
export function throttle (fn, delay = 250) {
  let timer
  let last

  return function () {
    const context = this
    const args = arguments
    const now = +new Date()

    // 如果距离上次执行fn函数的时间小于 delay, 那么就放弃执行fn，重新计时
    if (last && now < last + delay) {
      clearTimeout(timer)

      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, delay)
    }
    // 在时间区间为的最开始以及到达指定时间间隔的时候，执行一次
    else {
      last = now
      fn.apply(context, args)
    }
  }
}

/**
 * 抖动函数
 * // ===
 * 核心思想：强制一个函数在某个连续时间段内只执行一次，哪怕它本来会被调用多次
 * 立即执行：以点击按钮为例，连续点击10次，结果：立即执行第一次点击的效果，之后的都无效
 * 非立即执行：以点击按钮为例，连续点击10次，结果是前九次都无效，直到第十次点击后wait秒，才生效
 * === //
 * @param {Function} fn 实际要执行的函数
 * @param {Number} delay 延迟的时间
 * @param {Boolean} immediate 是否立即执行
 * @return {Function}
 */
export function debounce (fn, delay = 250, immediate) {
  let timer

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {
    const context = this
    const args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    timer && clearTimeout(timer)

    // immediate = true，立即执行
    if (immediate) {
      timer = setTimeout(function () {
        timer = null
      }, delay)
      !timer && fn.apply(context, args)
    }
    // immediate = false，非立即执行
    else {
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }
}

