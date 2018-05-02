const imgModel = require("../models/img")
const fs = require("fs")
const path = require("path")

class Img {
  /**
   * 根据文件夹id获取图片
   * @param ctx
   * @return {Promise.<void>}
   */
  static async getImgs (ctx) {
    const idFolder = parseInt(ctx.params.idFolder)
    const imgs = await imgModel.getDataByFolderId(idFolder)
    ctx.body = {
      status: 'success',
      data: imgs
    }
  }

  /**
   * 添加图片
   * @param ctx
   * @return {Promise.<void>}
   */
  static async addImg (ctx) {
    const reqBody = ctx.request.body

    const fields = reqBody.fields
    const file= reqBody.files.file
    const data = await dealWithImgData(fields, file)
    const uploadUrl = path.resolve(__dirname,`../../upload${data.ImgUrl}`)

    // 读写文件
    await uploadImg(uploadUrl, file)

    // 存储数据
    const id = await imgModel.addData(data)

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
  static async modifyImg (ctx) {
    const param = ctx.request.body
    await imgModel.modifyNameById(param.ImgName, parseInt(param.idImg))
    ctx.body = {
      status: 'success'
    }
  }
  static async delImg (ctx) {
    const id = parseInt(ctx.params.idImg)
    await imgModel.delById(id)
    ctx.body = {
      status: 'success'
    }
  }
}

module.exports =  Img

/**
 * 处理图片数据
 * @param fields
 * @example {
 *  Folder_idFolder: 1,
 *  FolderName: 'progress',
 * }
 * @param file
 * @return {{}}
 */
function dealWithImgData (fields, file) {
  const data = {}

// 图片路径
  data.ImgUrl = `/${fields.FolderName}/${file.name}`
  // 所属文件夹id
  data.Folder_idFolder = parseInt(fields.Folder_idFolder)
  // 图片格式
  data.ImgExt = `.${file.name.split('.')[1]}`
  // 图片名
  data.ImgName = file.name.split('.')[0]

  return data
}

/**
 * 上传图片
 * @param url
 * @param file
 */
function uploadImg (url, file) {
  const reader = fs.createReadStream(file.path)
  const writer = fs.createWriteStream(url)
  reader.pipe(writer)
}