const CategoryModel = require("../models/category")

class Category {
  /**
   * 获取标签
   * @param ctx
   * @return {Promise.<void>}
   */
  static async getCategories (ctx) {
    const categories = await CategoryModel.get()
    ctx.body = {
      status: 'success',
      data: categories
    }
  }

  /**
   * 根据id获取类别
   * @param ctx
   * @return {Promise.<void>}
   */
  static async getCategory (ctx) {
    const id = parseInt(ctx.params.id)

    const category = await CategoryModel.getById(id)

    ctx.body = {
      status: 'success',
      data: category
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
  static async delCategory (ctx) {
    const id = ctx.params.id

    const result = await CategoryModel.del(id)

    ctx.body = {
      status: 'success',
      data: result
    }
  }
}



module.exports = Category