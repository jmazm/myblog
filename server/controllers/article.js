/**
 * CORS - 跨域资源共享 == 》 文章详情中的图片存储在图片服务器中，需要跨域获取
 * // ===
 * 1.特点
   1.1 实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信
   1.2 IE<10不支持
   1.3 CORS有两种请求：简单请求和非简单请求
 * 2. 简单请求
   2.1 只要同时满足以下两大条件，就属于简单请求
   2.1.a 请求方法是以下三种方法之一：HEAD、GET、POST
   2.1.b HTTP的头信息不超出以下几种字段：Accept、Accept-Language、Content-Language、Last-Event-ID
         Content-Type只限三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain
 * 3. 非简单请求：不是简单请求的都是非简单请求
 * 4. 相关头字段
   4.1 Origin（本次请求来自哪个源（协议 + 域名 + 端口））+ Access-Control-Allow-Origin（服务器允许的源）
   4.2 Access-Control-Request-Method + Accecc-Control-Allow-Method
   4.3 Access-Control-Request-Headers + Access-Control-Allow-Headers
   4.4 ajax中的withCredentials + Access-Control-Allow-Credentials：布尔值，表示是否允许发送Cookie
   4.5 Access-Control-Max-Age：用来指定本次预检请求的有效期，单位为秒
 * 5、预检请求
   5.1 浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。
       只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。
     a、“预检”请求用的请求方法是OPTIONS，表示这个请求是用来询问的。
     b、头信息里面，关键字段是Origin，表示请求来自哪个源。
     c、包括两个特殊字段：Access-Control-Request-Method和Access-Control-Request-Headers
 * === //
 */

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
  static async getArticle (ctx, next) {
    await next()

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
  static async getArticleDetail (ctx, next) {
    await next()

    const id = parseInt(ctx.params.id)
    let articleData = await articleModel.getById(id)
    let prefix = config.prod.fileServerIP
    const Category_id = articleData.Category_id
    const Tag_id = articleData.Tag_id

    if(process.env.NODE_ENV === 'development') {
      prefix = config.dev.fileServerIP
    }

    articleData.Tag_id = await tagModel.getById(Tag_id)
    articleData.Category_id = await categoryModel.getById(Category_id)
    // 文章里展示的图片需要添加前缀
    articleData.content = articleData.content.replace(/\!\[(.*?)\]\((.*?)\)/g, `![$1](${prefix}$2)`)

    // 判断浏览器是否支持webp格式图片
    if (ctx.cookies.get('webp_show') == 'available') {
      articleData.content = articleData.content.replace(/\.(png|jpg)/g, '\.$1\.webp')
    }

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
  }

  /**
   * 删除文章
   * @param ctx
   * @return {Promise.<void>}
   */
  static async delArticle (ctx, next) {
    // 用户权限验证
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