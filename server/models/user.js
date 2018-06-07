class User {
  static async get (name) {
    const sql = "SELECT id, name, password, sault from admin WHERE name=?"
    const [user] = await global.db.query(sql, [name])
    return user[0]
  }
}

module.exports = User