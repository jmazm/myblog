class Folder {
  /**
   * 获取文件夹
   * @return {Promise.<*>}
   */
  static async getAllFolders () {
    const sql = `SELECT * FROM folder`
    const [folders] = await global.db.query(sql)
    return folders
  }

  /**
   * 根据id修改文件夹名
   * @param FolderName
   * @param idFolder
   * @return {Promise.<*>}
   */
  static async modifyNameById (FolderName, idFolder) {
    const sql = `UPDATE folder SET FolderName=? WHERE idFolder=?`
    const result = await global.db.query(sql, [FolderName, idFolder])
    return result
  }

  /**
   * 根据id删除文件夹
   * @param idFolder
   * @return {Promise.<*>}
   */
  static async delById (idFolder) {
    console.log(typeof idFolder)
    // 先查询文件夹里有没有图片
    let sql = `SELECT idImg FROM img WHERE Folder_idFolder=?`
    let [ids] = await global.db.query(sql, [idFolder])

    if (ids.length > 0) {
      sql = `DELETE FROM img WHERE Folder_idFolder=?`
      await global.db.query(sql, [idFolder])
    }

    // 再删除文件夹
    sql = `DELETE FROM folder WHERE idFolder=?`
    let result = await global.db.query(sql, [idFolder])
    console.log(result)
    
    return result[0]
  }

  /**
   * 添加文件夹
   * @param folderDataObject
   * @example {
   * FolderName: "xxx"
   * }
   * @return {Promise.<Number>}
   */
  static async addData (folderDataObject) {
    const sql = `INSERT INTO folder SET ?`
    const result = await global.db.query(sql, folderDataObject)
    return result[0].insertId
  }
}

module.exports =  Folder