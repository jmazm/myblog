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
    const sql = `SELECT a.id, a.title, a.foreword, a.imgSrc, a.date,
                  t.id AS Tag_id, t.name AS Tag_name, 
                  c.id AS Category_id, c.name AS Category_name
                  FROM article AS a, tag AS t, category AS c 
                  WHERE a.Tag_id=t.id AND a.Category_id=c.id 
                  ORDER BY date Limit ?,?`
    const [articles] = await global.db.query(sql, [(pageNum - 1) * pageSize, pageSize])
    return articles
  }

  /**
   * 根据id获取文章数据
   * @param id
   * @return {Promise.<*>}
   */
  static async getById (id) {
    const sql = `SELECT * FROM article WHERE id=?`
    const [articles] = await global.db.query(sql, [id])
    return articles[0]
}

  /**
   * 根据标签获取文章数据
   * @param tagId
   * @param pageNum
   * @param pageSize
   * @return {Promise.<*>}
   */
  static async getByTag (tagId, pageNum, pageSize) {
    const sql = `SELECT * FROM article WHERE Tag_id=? ORDER BY date Limit ?,?`
    const [articles] = await global.db.query(sql, [tagId, (pageNum - 1) * pageSize, pageSize])
    return articles
  }

  /**
   * 根据类别获取文章数据
   * @param categoryId
   * @param pageNum
   * @param pageSize
   * @return {Promise.<*>}
   */
  static async getByCategory (categoryId, pageNum, pageSize) {
    const sql = `SELECT * FROM article WHERE Category_id=? ORDER BY date Limit ?,?`
    const [articles] = await global.db.query(sql, [categoryId, (pageNum - 1) * pageSize, pageSize])
    return articles
  }

  /**
   * 添加文章数据
   * @param articleDataObj
   * @return {Promise.<Number|number|*>}
   */
  static async add (articleDataObj) {
    const sql = `INSERT INTO article SET ?`
    const result = await global.db.query(sql, articleDataObj)
    return result[0].insertId
  }

  /**
   * 根据id修改文章数据
   * @param articleDataObj
   * @return {Promise.<void>}
   */
  static async modifyById (articleDataObj) {
    const sql = `UPDATE article SET ? WHERE id=?`
    const result = await global.db.query(sql, [articleDataObj, parseInt(articleDataObj.idArticle)])
    return result
  }

  /**
   * 根据id删除文章
   * @param id
   * @return {Promise.<void>}
   */
  static async delById (id) {
    const sql = `DELETE FROM article WHERE id=?`
    const result = await global.db.query(sql, [id])
    return result[0]
  }

  /**
   * 获取全部文章总数
   * @return {Promise.<*>}
   */
  static async getTotal () {
    const sql = `SELECT COUNT(id) AS TOTAL_ARTICLE FROM article`
    const [total] = await global.db.query(sql)
    return total[0]["TOTAL_ARTICLE"]
  }

  /**
   * 获取同一标签下文章的总数
   * @return {Promise.<*>}
   */
  static async getTotalByTag (tagId) {
    const sql = `SELECT COUNT(id) AS TOTAL_ARTICLE FROM article WHERE Tag_id=?`
    const [total] = await global.db.query(sql, [tagId])
    return total[0]["TOTAL_ARTICLE"]
  }

  /**
   * 获取同一类别下文章的总数
   * @return {Promise.<*>}
   */
  static async getTotalByCategory (categoryId) {
    const sql = `SELECT COUNT(id) AS TOTAL_ARTICLE FROM article WHERE Category_id=?`
    const [total] = await global.db.query(sql, [categoryId])
    return total[0]["TOTAL_ARTICLE"]
  }
}
module.exports = Article
