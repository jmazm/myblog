const ModelError = require('./modelerror')

class Category {
  /**
   * 获取标签
   * @return {Promise.<*>}
   */
  static async get () {
    const sql = `SELECT * FROM category`
    const [categories] = await global.db.query(sql)
    return categories
  }
  static async getById (id) {
    const sql = `SELECT * FROM category WHERE id=?`
    let [category] = await global.db.query(sql, id)
    if (category[0]) {
      category = category[0]
    }
    return category
  }
  static async set (val) {
    const sql = `INSERT INTO category SET ?`
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
    // 先将对应的文章的Category_Id 设置为null
    let sql = `UPDATE article SET Category_id=null WHERE Category_id=?`
    await global.db.query(sql, [id])

    // 再删除对应的类别
    sql = `DELETE FROM category WHERE id=?`
    await global.db.query(sql, [id])

    // 再获取所有类别名称，返回出去
    const result = this.get()

    return result
  }
}

module.exports = Category