/**
 * 继承
 * // === 步骤 === //
 * // === 1. 复制一份父类的原型对象 prototype，并赋值给新变量proto === //
 * // === 2. 修改原型对象 proto 的constructor指向为子类 === //
 * // === 3. 将所复制的原型对象proto赋值给子类的原型对象 === //
 * @param parent 父类
 * @param child 子类
 */
export function inheritProto (parent, child) {
  const proto = Object.create(parent.prototype)
  proto.constructor = child
  child.prototype = proto
}