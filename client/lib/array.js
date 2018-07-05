/**
 * 迭代器模式
 * // ===
 * 1. 定义：指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
     迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。
 * 2. 内部迭代器 - 如下面 each 函数
   2.1 定义：内部已经定义好了迭代规则，它完全接手整个迭代过程，外部只需要一次初始调用。
   2.2 缺点：由于内部迭代器的迭代规则已经被提前规定，each 函数就无法同时迭代 2 个数组了
 * 3. 外部迭代器 - 如下面的 iterator 函数
   3.1 外部迭代器必须显式地请求迭代下一个元素。
 * === //
 */

/**
 * 内部迭代器
 * @param {Array} arr - 数组
 * @param {Function} callback - 回调函数
 */
export function each (arr, callback) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    callback && callback(arr[i], i, arr)
  }
}

/**
 * 外部迭代器
 * @param {Array} arr - 数组
 * @return {{next: next, isDone: isDone, getCurItem: getCurItem}}
 */
export function iterator (arr) {
  let current = 0

  const next = function () {
    current += 1
  }

  const isDone = function () {
    return current >= arr.length
  }

  const getCurItem = function () {
    return arr[current]
  }

  return {
    next: next,
    isDone: isDone,
    getCurItem: getCurItem
  }
}

/**
 * 倒序迭代器
 * @param arr
 * @param callback
 */
export function reverseEach (arr, callback) {
  for (let i = arr.length; i > 0; i--) {
    callback && callback(arr[i], i, arr)
  }
}

