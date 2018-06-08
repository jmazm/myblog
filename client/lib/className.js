/**
 * 添加类名
 * // === 思路 === //
 * // === 1、如果类名为空，直接添加想要添加的类名；=== //
 * // === 2、如果类名不为空，其格式是：空格+需要添加的类名（先判断要添加的类名是否已存在，不存在则添加，已存在就不添加。） === //
 * @param node
 * @param classname
 */
export function addClass (node, classname) {
  let cName = node.className

  if (cName === '') {
    cName += classname.trim()
  } else {
    const isExisted = node.className.split(' ').some((item) => {
      return item === classname
    })

    if (!isExisted) {
      cName += ` ${classname.trim()}`
    }
  }

  node.className = cName
}

/**
 *
 * // === 思路 === //
 * // === 利用空格为分割符号，形成类名数组；通过数组方法filter，将想要删除的类名删除掉；最后再通过join方法将数组中的每一项连接起来 === //
 * @param node
 * @param classname
 */
export function removeClass (node, classname) {
  let arr = node.className.split(' ')

  arr = arr.filter((item) => {
    return item !== classname
  })

  node.className = arr.join(' ')
}

/**
 * 替代类名
 * // === 思路 ===//
 * // === 1、获取元素的类名，并将类名转化为数组=== //
 * // === 2、通过数组的map方法，用新类名将旧类名替代，返回新的类名数组 === //
 * // === 3、通过join方法，形成字符串，并赋值给元素的className === //
 * @param node
 * @param oldClassname
 * @param newClassname
 */
export function replaceClass (node, oldClassname, newClassname) {
  let initClassName = node.className.split(' ')

  initClassName = initClassName.map((item) => {
    return item === oldClassname ? newClassname : item
  })

  node.className = initClassName.join(' ')
}
