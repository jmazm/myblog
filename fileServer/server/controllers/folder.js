const folderModel = require("../models/folder")

class Folder {
  static async getFolders (ctx) {
    const query = ctx.request.query
    const pageNum = query.pageNum

    let folders

    if (pageNum) {

    } else {
      folders = await folderModel.getAllFolders()

    }

    ctx.body = {
      status: 'success',
      data: folders
    }
  }
  static async addFolder (ctx) {
    const param = ctx.request.body
    const id = await folderModel.addData(param)
    if (id) {
      ctx.body = {
        status: 'success'
      }
    } else {
      ctx.body = {
        status: 'failure'
      }
    }

  }
  static async modifyFolder (ctx) {
    const param = ctx.request.body
    await folderModel.modifyNameById(param.FolderName, parseInt(param.idFolder))
    ctx.body = {
      status: 'success'
    }
  }
  static async delFolder (ctx) {
    const id = parseInt(ctx.params.idFolder)
    await folderModel.delById(id)
    ctx.body = {
      status: 'success'
    }
  }
}

module.exports =  Folder