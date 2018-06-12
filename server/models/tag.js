const ModelError = require('./modelerror')

class Tag {
  /**
   * 获取标签
   * @return {Promise.<*>}
   */
  static async get () {
    const sql = `SELECT * FROM tag`
    const [tags] = await global.db.query(sql)
    return tags
  }
  static async getById (id) {
    const sql = `SELECT * FROM tag WHERE id=?`
    let [tag] = await global.db.query(sql, [id])

    if (tag[0]) {
      tag = tag[0]
    }
    return tag
  }
  static async set (val) {
    const sql = `INSERT INTO tag SET ?`
    try {
      const result = await global.db.query(sql, val)
      return result[0].insertId
    } catch(e) {
      switch (e.code) { // just use default MySQL messages for now
        case 'ER_BAD_NULL_ERROR':
        case 'ER_NO_REFERENCED_ROW_2':
        case 'ER_NO_DEFAULT_FOR_FIELD':
          throw new ModelError(403, e.message); // Forbidden
        case 'ER_DUP_ENTRY':
          throw new ModelError(409, e.message); // Conflict
        case 'ER_BAD_FIELD_ERROR':
          throw new ModelError(500, e.message); // Internal Server Error for programming errors
        default:
          throw new ModelError(500, e.message); // Internal Server Error for uncaught exception
      }
    }
  }

  static async del (id) {
    // 先将对应的文章的 Tag_id 设置为null
    let sql = `UPDATE article SET Tag_id=null WHERE Tag_id=?`
    await global.db.query(sql, [id])

    // 再删除对应的类别
    sql = `DELETE FROM tag WHERE id=?`
    await global.db.query(sql, [id])

    // 再获取所有类别名称，返回出去
    const result = this.get()

    return result
  }
}

module.exports = Tag