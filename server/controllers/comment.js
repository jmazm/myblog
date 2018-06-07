const CommentModel = require("../models/comment")

class Comment {
  /**
   * 获取评论
   * @param ctx
   * @return {Promise.<void>}
   */
  static async getComments (ctx) {
    const comments = await CommentModel.get()
    ctx.body = {
      status: 'success',
      data: comments
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
   * 添加评论
   * @param ctx
   * @return {Promise.<void>}
   */
  static async addComment (ctx) {
    const contentType = ctx.request.headers["content-type"]
    let params = ctx.request.body
    let postData = params.data

    if (contentType.includes('multipart')) {
      params = params.fields
      postData = params.data
    }

    const result = await CommentModel.add(JSON.parse(postData))

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



module.exports = Comment