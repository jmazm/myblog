const mysqlErr = require("../tools/mysql-error")

class User {
  static async get (name) {
    try {
      const sql = "SELECT id, name, password, sault from admin WHERE name=?"
      const [user] = await global.db.query(sql, [name])
      return user[0]
    } catch (err) {
      throw mysqlErr(err)
    }
  }
}

module.exports = User