const TagModel = require("../models/tag")

class Tag {
  /**
   * 获取标签
   * @param ctx
   * @return {Promise.<void>}
   */
  static async getTags (ctx) {
    const tags = await TagModel.get()
    ctx.body = {
      status: 'success',
      data: tags
    }
  }
  /**
   * 获取标签
   * @param ctx
   * @return {Promise.<void>}
   */
  static async getTagById (ctx) {
    const idTag = parseInt(ctx.params.id)
    let tag = await TagModel.getById(idTag)

    ctx.body = {
      status: 'success',
      data: tag
    }
  }

  /**
   * 添加标签
   * @param ctx
   * @return {Promise.<void>}
   */
  static async addTag (ctx, next) {
    await next()

    const contentType = ctx.request.headers["content-type"]
    let val = ctx.request.body

    if (contentType.includes('multipart')) {
      val = val.fields
    }

    const result = await TagModel.set(val)

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
   * 删除标签
   * @param ctx
   * @return {Promise.<void>}
   */
  static async delTag (ctx, next) {
    await next()

    const id = ctx.params.id

    const result = await TagModel.del(id)

    ctx.body = {
      status: 'success',
      data: result
    }
  }
}



module.exports = Tag