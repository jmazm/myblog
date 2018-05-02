class Img {
  /**
   * 根据文件夹id获取相应图片
   * @param folderId
   * @return {Promise.<*>}
   */
  static async getDataByFolderId (folderId) {
    const sql = `SELECT * FROM img WHERE Folder_idFolder=?`
    const [imgs] = await global.db.query(sql, [folderId])
    return imgs
  }

  /**
   * 根据id修改图片名
   * @param ImgName
   * @param idImg
   * @return {Promise.<*>}
   */
  static async modifyNameById (ImgName, idImg) {
    const sql = `UPDATE img SET ImgName=? WHERE idImg=?`
    const result = await global.db.query(sql, [ImgName, idImg])
    return result
  }

  /**
   * 根据id删除图片
   * @param idImg
   * @return {Promise.<*>}
   */
  static async delById (idImg) {
    const sql = `DELETE FROM img WHERE idImg=?`
    const result = await global.db.query(sql, [idImg])
    return result[0]
  }
  /**
   * 添加图片
   * @param ImgDataObject
   * @example {
   * ImgName: "xxx",
   * ImgUrl: "xxx",
   * Folder_idFolder: 1
   * }
   * @return {Promise.<Number>}
   */
  static async addData (ImgDataObject) {
    const sql = `INSERT INTO img SET ?`
    const result = await global.db.query(sql, ImgDataObject)
    return result[0].insertId
  }
}

module.exports =  Img