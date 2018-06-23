const mysqlErr = require("../tools/mysql-error")

class Tag {
  /**
   * 获取标签
   * @return {Promise.<*>}
   */
  static async get () {
    try {
      const sql = `SELECT * FROM tag`
      const [tags] = await global.db.query(sql)
      return tags
    } catch (err) {
      throw mysqlErr(err)
    }
  }

  /**
   *
   * @return {Promise.<*>}
   */
  static async getById (tagId) {
    try {
      const sql = `SELECT * FROM tag WHERE id=?`
      const [tags] = await global.db.query(sql, [tagId])
      return tags[0]
    } catch (err) {
      throw mysqlErr(err)
    }
  }

  /**
   * 添加标签
   * @param val
   * @return {Promise.<Number>}
   */
  static async set (val) {
    const sql = `INSERT INTO tag SET ?`
    try {
      const result = await global.db.query(sql, val)
      return result[0].insertId
    } catch(e) {
      throw mysqlErr(e)
    }
  }

  /**
   * 删除标签
   * @param id
   * @return {Promise.<*>}
   */
  static async del (id) {
    try {
      // 先将对应的文章的 Tag_id 设置为null
      let sql = `UPDATE article SET Tag_id=null WHERE Tag_id=?`
      await global.db.query(sql, [id])

      // 再删除对应的类别
      sql = `DELETE FROM tag WHERE id=?`
      await global.db.query(sql, [id])

      // 再获取所有类别名称，返回出去
      const result = this.get()

      return result
    } catch (err) {
      throw mysqlErr(err)
    }
  }
}

module.exports = Tag