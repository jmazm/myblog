const mysqlErr = require("../tools/mysql-error")

class Article {
  /**
   * 获取所有文章的数据
   * @param pageNum
   * @param pageSize
   * @return {Promise.<*>}
   * @example
   * [
        {
          "id":1,
          "title":"圆饼图",
          "foreword":"圆饼图的实现",
          "imgSrc":"http://127.0.0.1:3002/progress/progress-01.png",
          "date":"2018-04-13T16:00:00.000Z",
          "Tag_id":2,
          "Tag_name":"css",
          "Category_id":1,
          "Category_name":"原创"
        }
   * ]
   */
  static async getAll (pageNum, pageSize) {
    try {
      const sql = `SELECT a.id, a.title, a.foreword, a.imgSrc, a.date, a.isPublished, a.content,
                  t.id AS Tag_id, t.name AS Tag_name, 
                  c.id AS Category_id, c.name AS Category_name
                  FROM article AS a, tag AS t, category AS c 
                  WHERE a.Tag_id=t.id AND a.Category_id=c.id 
                  ORDER BY date Limit ?,?`
      const [articles] = await global.db.query(sql, [(pageNum - 1) * pageSize, pageSize])

      return articles
    } catch (e) {
      throw mysqlErr(e)
    }
  }

  static async getAllIsPublished (isPublished,pageNum, pageSize) {
   try {
     const sql = `SELECT a.id, a.title, a.foreword, a.imgSrc, a.date,  a.isPublished,
                  t.id AS Tag_id, t.name AS Tag_name, 
                  c.id AS Category_id, c.name AS Category_name
                  FROM article AS a, tag AS t, category AS c 
                  WHERE a.isPublished=? AND a.Tag_id=t.id AND a.Category_id=c.id 
                  ORDER BY date Limit ?,?`

     const [articles] = await global.db.query(sql, [isPublished, (pageNum - 1) * pageSize, pageSize])

     return articles
   } catch (e) {
     throw mysqlErr(e)
   }
  }

  /**
   * 根据id获取文章数据
   * @param id
   * @return {Promise.<*>}
   */
  static async getById (id) {
   try {
     const sql = `SELECT * FROM article WHERE id=?`
     const [articles] = await global.db.query(sql, [id])
     return articles[0]
   } catch (e) {
     throw mysqlErr(e)
   }
}

  /**
   * 根据标签获取文章数据
   * @param tagId
   * @param pageNum
   * @param pageSize
   * @return {Promise.<*>}
   */
  static async getByTag (tagName, pageNum, pageSize) {
   try {
     // 先查询这个标签是否存在
     let sql = `SELECT * FROM tag WHERE name=?`
     const [tag] = await global.db.query(sql, [tagName])

     if (!tag[0]) {
       return
     }

     // 根据标签名查询对应的文章
     const tagId = tag[0].id
     sql =  `SELECT a.id, a.title, a.foreword, a.imgSrc, a.date, a.isPublished,
                  t.id AS Tag_id, t.name AS Tag_name, 
                  c.id AS Category_id, c.name AS Category_name
                  FROM article AS a, tag AS t, category AS c 
                  WHERE Tag_id=? AND a.Tag_id=t.id AND a.Category_id=c.id 
                  ORDER BY date Limit ?,?`

     const [articles] = await global.db.query(sql, [tagId, (pageNum - 1) * pageSize, pageSize])

     // 再查询这个标签名下文章的总数
     sql = `SELECT COUNT(id) AS TOTAL_ARTICLE FROM article WHERE Tag_id=?`
     const [total] = await global.db.query(sql, [tagId])

     return {
       articles,
       total: total[0]["TOTAL_ARTICLE"]
     }
   } catch (e) {
     throw mysqlErr(e)
   }
  }

  /**
   * 根据类别获取文章数据
   * @param categoryId
   * @param pageNum
   * @param pageSize
   * @return {Promise.<*>}
   */
  static async getByCategory (categoryName, pageNum, pageSize) {
    try {
      // 先查询这个类别是否存在
      let sql = `SELECT * FROM category WHERE name=?`
      const [category] = await global.db.query(sql, [categoryName])

      if (!category[0]) {
        return
      }

      // 根据类别名查询对应的文章
      const categoryId = category[0].id

      sql = `SELECT a.id, a.title, a.foreword, a.imgSrc, a.date, a.isPublished,
                  t.id AS Tag_id, t.name AS Tag_name, 
                  c.id AS Category_id, c.name AS Category_name
                  FROM article AS a, tag AS t, category AS c 
                  WHERE Category_id=? AND a.Tag_id=t.id AND a.Category_id=c.id 
                  ORDER BY date Limit ?,?`

      const [articles] = await global.db.query(sql, [categoryId, (pageNum - 1) * pageSize, pageSize])

      // 再查询这个类别下文章的总数
      sql = `SELECT COUNT(id) AS TOTAL_ARTICLE FROM article WHERE Category_id=?`

      const [total] = await global.db.query(sql, [categoryId])

      return {
        articles,
        total: total[0]["TOTAL_ARTICLE"]
      }
    } catch (e) {
      throw mysqlErr(e)
    }
  }

  /**
   * 根据文章名获取文章数据
   * @param articleName
   * @param pageNum
   * @param pageSize
   * @return {Promise.<*>}
   */
  static async getByTitle (articleName, pageNum, pageSize) {
    try {
      let sql = `SELECT a.id, a.title, a.foreword, a.imgSrc, a.date, a.isPublished,
                  t.id AS Tag_id, t.name AS Tag_name, 
                  c.id AS Category_id, c.name AS Category_name
                  FROM article AS a, tag AS t, category AS c 
                  WHERE a.title LIKE "%${articleName}%" AND a.Tag_id=t.id AND a.Category_id=c.id 
                  ORDER BY date Limit ?,?`
      const [articles] = await global.db.query(sql, [(pageNum - 1) * pageSize, pageSize])

      sql = `SELECT COUNT(id) AS TOTAL_ARTICLE FROM article WHERE title LIKE "%${articleName}%"`

      const [total] = await global.db.query(sql)

      return {
        articles,
        total: total[0]["TOTAL_ARTICLE"]
      }
    } catch (e) {
      throw mysqlErr(e)
    }
  }

  /**
   * 添加文章数据
   * @param articleDataObj
   * @return {Promise.<Number|number|*>}
   */
  static async add (articleDataObj) {
    try {
      const sql = `INSERT INTO article SET ?`
      const result = await global.db.query(sql, articleDataObj)
      return result[0].insertId
    } catch (e) {
      throw mysqlErr(e)
    }
  }

  /**
   * 根据id修改文章数据
   * @param postData
   * @param pageSize
   * @param pageNum
   * @return {Promise.<void>}
   */
  static async modifyById (postData, pageNum, pageSize) {
    try {
      const {articleData, id} = postData
      const sql = `UPDATE article SET ? WHERE id=?`

      await global.db.query(sql, [articleData, parseInt(id)])

      // 再获取文章数据
      const result = await this.getAll(pageNum, pageSize)

      return result
    } catch (e) {
      throw mysqlErr(e)
    }
  }

  /**
   * 根据id修改文章：文章是否发布
   * @param obj
   * @return {Promise.<*>}
   */
  static async modifyIsPublishedById (obj) {
    try {
      const sql = `UPDATE article SET isPublished=? WHERE id=?`
      const result = await global.db.query(sql, [parseInt(obj.isPublished), parseInt(obj.id)])
      return result
    } catch (e) {
      throw mysqlErr(e)
    }
  }

  /**
   * 根据id删除文章
   * @param id
   * @param pageSize
   * @param pageNum
   * @return {Promise.<void>}
   */
  static async delById (id, pageNum, pageSize) {
   try {
     // 先将文章相关评论的Article_id设置为null
     let sql = `UPDATE comment SET Article_id=null WHERE Article_id=?`
     await global.db.query(sql, [id])

     // 再删除文章
     sql = `DELETE FROM article WHERE id=?`
     await global.db.query(sql, [id])

     // 再获取文章数据
     let result = await this.getAll(pageNum, pageSize)

     if (result.length == 0 && pageNum != 1) {
       pageNum = pageNum - 1
       result = await this.getAll(pageNum, pageSize)
     }

     return result
   } catch (e) {
     throw mysqlErr(e)
   }
  }

  /**
   * 获取全部文章总数
   * @return {Promise.<*>}
   */
  static async getTotal () {
    try {
      const sql = `SELECT COUNT(id) AS TOTAL_ARTICLE FROM article`
      const [total] = await global.db.query(sql)
      return total[0]["TOTAL_ARTICLE"]
    } catch (e) {
      throw mysqlErr(e)
    }
  }

  static async getTotalByIsPublished (isPublished) {
    try {
      const sql = `SELECT COUNT(id) AS TOTAL_ARTICLE FROM article WHERE Category_id=?`
      const [total] = await global.db.query(sql, [isPublished])
      return total[0]["TOTAL_ARTICLE"]
    } catch (e) {
      throw mysqlErr(e)
    }
  }
}
module.exports = Article
