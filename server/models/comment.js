const mysqlErr = require("../tools/mysql-error")

class Comment{
  /**
   * 添加评论
   * @param val
   * @return {Promise.<Number|number|*>}
   */
    static async add (val) {
      try {
        const sql = `INSERT INTO comment SET ?`
        const result = await global.db.query(sql, val)
        return result[0].insertId
      } catch (e) {
        throw mysqlErr(e)
      }
    }

  /**
   * 获取全部评论
   * @return {Promise.<void>}
   */
  static async get () {
    try {
      const sql = `SELECT * FROM comment ORDER BY date DESC`
      const [comments] = await global.db.query(sql)
      return comments
    } catch (e) {
      throw mysqlErr(e)
    }
  }
}

module.exports = Comment
