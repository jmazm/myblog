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
}

module.exports = Category