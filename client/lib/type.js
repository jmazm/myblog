/**
 * 判断变量类型
 * 6大基本类型：String 、Number、Boolean、Undefined、Null、Symbol
 * // ===
 * 1. typeof：只能得出 - number/string/object/function/boolean/undefined
     typeof /hello/ 或者 null 或者 [] ===》 object
 * 2. instanceof：用来判断引用类型属于哪一类 - 主要用来判断实例对象的属性（`__proto__`）和构造函数属性（`prototype`）是不是同一个引用
   reg instanceof RegExp
   array instanceof Array
   obj instanceof Object
   fn instanceof Function
 * 3. Object.prototype.toString.call() - 所有类型都可以测出来
   1 =》 [object Number]
   'b' =》 [object String]
   new Object() =》[object Object]
   /hello/ =》[object RegExp]
   function(){} =》 [object Function]
   undefined =》[object Undefined]
   null =》[object Null]
   [] =》[object Array]
   true =》[object Boolean]
 * === //
 */

/**
 * 获取类型
 * @param {*} object
 * @return {*}
 */
function getType (object) {
  return Object.prototype.toString.call(object).replace(/\[object\s|\]/, '')
}

/**
 * 类型是否为数组
 * @param {array} arr
 * @return {boolean}
 */
export function isArray (arr) {
  return getType(arr) == 'Array'
}

/**
 * 是否为字符串
 * @param {string} str
 * @return {boolean}
 */
export function isString (str) {
  return getType(str) == 'String'
}