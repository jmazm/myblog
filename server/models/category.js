const mysqlErr = require("../tools/mysql-error")

class Category {
  /**
   * 获取标签
   * @return {Promise.<*>}
   */
  static async get () {
    try {
      const sql = `SELECT * FROM category`
      const [categories] = await global.db.query(sql)
      return categories
    } catch (e) {
      throw mysqlErr(e)
    }
  }

  /**
   * 添加类别
   * @param val
   * @return {Promise.<Number>}
   */
  static async set (val) {
    const sql = `INSERT INTO category SET ?`

    try {
      const result = await global.db.query(sql, val)
      return result[0].insertId
    } catch(e) {
      throw mysqlErr(e)
    }
  }

  /**
   * 删除
   * @param id
   * @return {Promise.<*>}
   */
  static async del (id) {
   try {
     // 先将对应的文章的Category_Id 设置为null
     let sql = `UPDATE article SET Category_id=null WHERE Category_id=?`
     await global.db.query(sql, [id])

     // 再删除对应的类别
     sql = `DELETE FROM category WHERE id=?`
     await global.db.query(sql, [id])

     // 再获取所有类别名称，返回出去
     const result = this.get()

     return result
   } catch (e) {
     throw mysqlErr(e)
   }
  }
}

module.exports = Category