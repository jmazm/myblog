const articleModel = require("../models/article")
const tagModel = require("../models/tag")
const categoryModel = require("../models/category")

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
    if (query.tag) {
      const tagId = parseInt(query.tag)
      articles = await articleModel.getByTag(tagId, pageNum, pageSize)
      total = await articleModel.getTotalByTag(tagId)
    }
    // 根据类别获取文章：v1/article?category=1&pageNum=1&pageSize=10
    else if (query.category) {
      const categoryId = parseInt(query.category)
      articles = await articleModel.getByCategory(categoryId, pageNum, pageSize)
      total = await articleModel.getTotalByCategory(categoryId)
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

    const Category_id = articleData.Category_id
    const Tag_id = articleData.Tag_id
    articleData.Tag_id = await tagModel.getById(Tag_id)
    articleData.Category_id = await categoryModel.getById(Category_id)

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
    console.log(2)
    // 用户权限验证
    await next()
    console.log(1)

    const contentType = ctx.request.headers["content-type"]
    let postData = ctx.request.body
    console.log(postData)

    if (contentType.includes('multipart')) {
      postData = postData.fields
    }

    const articleData = postData.articleData
    console.log(articleData)

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
  }

  /**
   * 修改文章
   * @param ctx
   * @return {Promise.<void>}
   */
  static async modifyArticle (ctx) {
    const articleDataObj = ctx.request.body
    await articleModel.modifyById(articleDataObj)
    ctx.body = {
      status: 'success'
    }
  }

  /**
   * 删除文章
   * @param ctx
   * @return {Promise.<void>}
   */
  static async delArticle (ctx) {
    const id = ctx.params.id
    await articleModel.delById(id)
    ctx.body = {
      status: 'success'
    }
  }
}



module.exports = Article