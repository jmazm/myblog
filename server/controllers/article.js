const articleModel = require("../models/article")
const tagModel = require("../models/tag")
const categoryModel = require("../models/category")
const config = require("../../config")


class Article {
  /**
   * 获取文章
   * @param ctx
   * @return {Promise.<void>}
   */
  static async getArticle (ctx) {
    const query = ctx.query
    const pageNum = parseInt(query.pageNum)
    const pageSize = parseInt(query.pageSize)
    let articles
    let total

    // 根据标签获取文章：/v1/article?tag=1&pageNum=1&pageSize=10
    // 根据标签获取文章：/v1/article?tag=http&pageNum=1&pageSize=10
    if (query.tag) {
      const tag = query.tag
      const result = await articleModel.getByTag(tag, pageNum, pageSize)
      if (result) {
        articles = result.articles
        total = result.total
      }
    }
    // 根据类别获取文章：api/article?category=1&pageNum=1&pageSize=10
    else if (query.category) {
      const category = query.category
      const result = await articleModel.getByCategory(category, pageNum, pageSize)
      if (result) {
        articles = result.articles
        total = result.total
      }
    }
    else if  (query.title) {
      const title = query.title
      const result = await articleModel.getByTitle(title, pageNum, pageSize)
      if (result) {
        articles = result.articles
        total = result.total
      }
    }
    // 获取已发表文章或者未发表文章
    // v1/article?isPublished=1&pageNum=1&pageSize=10
    else if  (query.isPublished) {
      const isPublished = parseInt(query.isPublished)
      articles = await articleModel.getAllIsPublished(isPublished, pageNum, pageSize)
      total = await articleModel.getTotalByIsPublished(isPublished)
    }
    // 获取所有文章：/v1/article?pageNum=1&pageSize=10
    else {
      articles = await articleModel.getAll(pageNum, pageSize)
      total = await articleModel.getTotal()
    }


    ctx.body = {
      status: 'success',
      data: articles,
      total: total
    }
  }

  /**
   * 获取文章详情
   * @param ctx
   * @return {Promise.<void>}
   */
  static async getArticleDetail (ctx) {
    const id = parseInt(ctx.params.id)
    let articleData = await articleModel.getById(id)
    let prefix = config.dev.fileServerIP
    const Category_id = articleData.Category_id
    const Tag_id = articleData.Tag_id

    if(process.env.NODE_ENV === 'production') {
      prefix = config.prod.fileServerIP
    }

    articleData.Tag_id = await tagModel.getById(Tag_id)
    articleData.Category_id = await categoryModel.getById(Category_id)
    // 文章里展示的图片需要添加前缀
    articleData.content = articleData.content.replace(/\!\[(.*?)\]\((.*?)\)/g, `![$1](${prefix}$2)`)

    ctx.body = {
      status: 'success',
      data: articleData
    }
  }

  /**
   * 添加文章
   * @param ctx
   * @return {Promise.<void>}
   */
  static async addArticle (ctx, next) {
    // 用户权限验证
    await next()

    try {
      const contentType = ctx.request.headers["content-type"]
      let postData = ctx.request.body

      if (contentType.includes('multipart')) {
        postData = postData.fields
      }

      let articleData = postData.articleData

      const result = await articleModel.add(articleData)

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
    } catch (err) {
        ctx.throw(500, err.message)
    }
  }

  /**
   * 修改文章
   * @param ctx
   * @return {Promise.<void>}
   */
  static async modifyArticle (ctx, next) {
    // 用户权限验证
    await next()

    try {
      const query = ctx.query
      const pageNum = parseInt(query.pageNum)
      const pageSize = parseInt(query.pageSize)

      const contentType = ctx.request.headers["content-type"]
      let postData = ctx.request.body

      if (contentType.includes('multipart')) {
        postData = postData.fields
      }

      const data = await articleModel.modifyById(postData, pageNum, pageSize)
      const total = await articleModel.getTotal()

      ctx.body = {
        status: 'success',
        data: data,
        total: total
      }

    } catch (err) {
      ctx.throw(500, err.message)
    }
  }

  /**
   * 删除文章
   * @param ctx
   * @return {Promise.<void>}
   */
  static async delArticle (ctx, next) {
    await next()

    const query = ctx.query
    const pageNum = parseInt(query.pageNum)
    const pageSize = parseInt(query.pageSize)
    const id = ctx.params.id

    const data = await articleModel.delById(id, pageNum, pageSize)
    const total = await articleModel.getTotal()

    ctx.body = {
      status: 'success',
      data: data,
      total: total
    }
  }
}



module.exports = Article