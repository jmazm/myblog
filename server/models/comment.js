class Comment{
  /**
   * 添加评论
   * @param val
   * @return {Promise.<Number|number|*>}
   */
    static async add (val) {
      const sql = `INSERT INTO comment SET ?`
      const result = await global.db.query(sql, val)
      return result[0].insertId
    }

  /**
   * 获取全部评论
   * @return {Promise.<void>}
   */
  static async get () {
    const sql = `SELECT * FROM comment ORDER BY date DESC`
    const [comments] = await global.db.query(sql)
    return comments
    }
}

module.exports = Comment
