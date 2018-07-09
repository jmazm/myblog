/**
 * new的实质
 *
 * // ===
 * 1. 创建一个空对象 obj
 * 2. 将空对象的__proto__指向构造函数的prototype - 拥有类的方法
 * 3. 修改构造函数的this指向，并调用 - 通过call - 拥有类的属性
 * 4. 返回obj
 * === //
 * @param {Function} constructor 构造函数
 * @return {{__proto__: *}}
 */
export default function (constructor) {
  let obj = {
    __proto__: constructor.prototype
  }

  // === 在node环境环境中不起作用 === //
  // o.__proto__ = constructor.prototype

  constructor.call(obj)

  return obj
}