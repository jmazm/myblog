/**
 * 模块化
 * // ===
 * 1. 模块化：将相同的功能的代码放到一个js文件里，分块管理
 * 2. 模块化有两个问题需注意，分别是命名冲突和变量污染，解决方法 - 创建命名空间
   2.1 前缀命名空间：主要是以模块名作为变量或者函数的前缀，这个方法依旧保留大量全局变量，治标不治本
   2.2 对象命名空间：就是将变量和函数存在一个变量里，我们可以通过 对象.xxx 的访问变量或者调用函数，
       不过有可能会导致调用链过长，同时，这个方法将所有的变量和方法都暴露出来，根本无私隐可言
   2.3 IIFE：创建一个私有作用域，函数和变量当放置在这个私有作用域里，并且可以提供对外接口，提供一些属性和方法供外调用；
       这个方法的好处在于：既可以创建私有变量，也解决了命名冲突、变量污染
 * 3. nodejs中的模块化
    nodejs的模块化是遵循 CommonJS的：每一个文件都是一个模块，通过module.exports暴露模块，通过require引入模块
    不过 CommonJs只适用于nodejs服务端，因为文件是存储在本地硬盘，读取速度较快，可以同步加载模块；
    但是 CommonJs 并不适用于浏览器端，因为文件都要通过网络去加载，如果用同步加载，既耗时也会阻塞页面
    所以 浏览器端需要异步加载所需模块，那就是AMD，主要基于define定义模块，require 调用模块；我们需要下载require.js才能实现。
 * 4. webpack如何实现模块化 - 本质还是IIFE
 * === //
 */

/**
 * reqiure 和 import 的异同
 * // ==
 * 1. 相同点：都是用来引入文件的
 * 2. 不同点：
   2.1 语法不同：
      import 必须放在文件的最开始，且前面不允许有其他逻辑代码。
      require则没有这个限制
   2.2 module.exports 什么，require的结果就是什么，甚至不需要赋值给某个变量之后再使用
      import的话，是不可以直接使用
   2.3 确定依赖的时机不一样：
      es6模块是在编译的时候就确定模块的依赖关系以及输入输出的变量
      commonJs则要在运行时才确定
 * === //
 */
const CategoryModel = require("../models/category")

class Category {
  /**
   * 获取标签
   * @param ctx
   * @return {Promise.<void>}
   */
  static async getCategories (ctx, next) {
    await next()

    const categories = await CategoryModel.get()

    ctx.body = {
      status: 'success',
      data: categories
    }
  }

  /**
   * 添加类别
   * @param ctx
   * @return {Promise.<void>}
   */
  static async addCategory (ctx, next) {
    await next()

    const contentType = ctx.request.headers["content-type"]
    let val = ctx.request.body

    if (contentType.includes('multipart')) {
      val = val.fields
    }

    const result = await CategoryModel.set(val)

    if (typeof result === 'number') {
      // 返回响应
      ctx.body = {
        status: 'success'
      }
    } else {
      ctx.body = {
        status: 'failure'
      }
    }



  }

  /**
   * 删除类别
   * @param ctx
   * @return {Promise.<void>}
   */
  static async delCategory (ctx, next) {
    await next()

    const id = ctx.params.id

    const result = await CategoryModel.del(id)

    ctx.body = {
      status: 'success',
      data: result
    }
  }
}



module.exports = Category