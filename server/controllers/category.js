const categoryModel = require("../models/category")

class Category {
  /**
   * 获取标签
   * @param ctx
   * @return {Promise.<void>}
   */
  static async getCategories (ctx) {
    const categories = await categoryModel.get()
    ctx.body = {
      status: 'success',
      data: categories
    }
  }
  static async getCategory (ctx) {
    const id = parseInt(ctx.params.id)

    const category = await categoryModel.getById(id)

    ctx.body = {
      status: 'success',
      data: category
    }
  }
  /**
   * 添加标签
   * @param ctx
   * @return {Promise.<void>}
   */
  static async addCategory (ctx) {
    const contentType = ctx.request.headers["content-type"]
    let val = ctx.request.body

    if (contentType.includes('multipart')) {
      val = val.fields
    }

    const result = await categoryModel.set(val)

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
}



module.exports = Category