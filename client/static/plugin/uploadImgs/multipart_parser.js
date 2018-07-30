const fs = require('fs')
const path = require('path')

class MultipartParser {
  constructor (req, cb, url) {
    this.req = req // req 请求
    this.cb = cb // 回调函数
    this.url = url
    this.bufferData = null // buffer 数据
    this.str = null // buffer 转化为 utf8 格式的字符串
    this.fields = {} // 存储field数据的对象
    this.files = {} // 存储files数据的对象
    // 初始化
    this.init()
  }

  /**
   * 初始化函数
   */
  init () {
    this.getData()
    this.dealWithDir()
  }

  /**
   * 获取数据
   */
  getData () {
    let req = this.req
    let arr = []
    req.on('data', chunk => {
      // 这里将传来的buffer数据push到数组是因为：
      // 如果传来的数据过大，那么所传的数据是不可能一次性传完的，可能会一段一段地传
      // 为了获取完整的数据，需要将正一段段buffer放到一个数组里
      arr.push(chunk)
    })

    // 接收数据完毕，才处理arr数组里的buffer数据
    req.on('end', () => {
      if (arr.length === 0) {
        return
      }

      // 将多个buffer对象结合为一个buffer对象
      this.bufferData = Buffer.concat(arr)

      // 将buffer对象转化为utf8格式的字符串
      this.str = this.bufferData.toString()

      // 获取文件或字段数据
      this.getFilesOrFieldsData()
    })
  }
  /**
   * 获取文件或字段数据
   */
  async getFilesOrFieldsData () {
    const bufferDatas = this.getEachField()
    // 每个字段数据的开始标识
    const startBuf = new Buffer('\r\n\r\n')
    // 每个字段数据的结束标识
    const endBuf = new Buffer('\r\n----')

    for (let eachFileds of bufferDatas) {
      const item = eachFileds.toString()
      // 4 代表的是 `\r\n\r\n`的长度 
      const startIndex = eachFileds.indexOf(startBuf) + 4
      const endIndex = eachFileds.indexOf(endBuf)
      // 字段名
      const name = item.match(/\sname="(.*?)"/)[1]
      // 文件名
      const fileName =  item.indexOf('filename') > -1 ? item.match(/\sfilename="(.*?)"/)[1] : ''
      // 处理文件
      if (fileName) {
        const ext = fileName.split('.')[1]
        const type = item.indexOf('Content-Type') > -1 ? item.match(/\r\nContent-Type:\s(.*?)\r\n/)[1] : ''
        const bufferData = eachFileds.slice(startIndex, endIndex)
        const url = await this.writeFile(bufferData, ext)

        this.files[name] = {
          name: fileName,
          type: type,
          url: url
        }
      } 
      // 处理字段
      else {
        this.fields[name] = eachFileds.slice(startIndex, endIndex).toString() || ''
      }
    }

    this.cb(this.fields, this.files)
  }

  /**
   * 获取每个字段
   */
  getEachField () {
    // 通过\r\n分隔，数组中第一个元素肯定是分隔符，即boundary
    const boundary = this.str.split('\r\n')[0]
    const boundaryBuffer = new Buffer(boundary)
    const boundaryBufferLength = boundaryBuffer.length

    // 存放boundary位置的数组
    let indexData = []
    // 存放每个字段的buffer数据的数组
    let bufferDatas = []
    // boundary的位置
    let boundaryIndex = this.bufferData.indexOf(boundaryBuffer, 0)

    // 以boundary为分界，获取一头一尾的index
    // 转化为字符串为 ----boundary xxx数据\r\n
    // 此时结尾的 \r\n 不足以作为结束标识
    while (boundaryIndex > -1) {
      indexData.push(boundaryIndex)
      boundaryIndex = this.bufferData.indexOf(boundaryBuffer, boundaryIndex + 1)
    }

    // 让每个表单数据有完整的分隔点，所以每个位置（除了第一个位置外）都加上 boundaryBufferLength
    // 转化成字符串就是 ----boundary xxx数据 ---boundary  或者为 \r\n xxx数据 ---boundary
    // 结尾的---boundary必不可少
    indexData = indexData.map((item, i) => {
      return i === 0 ? item : item + boundaryBufferLength
    })

    const indexDataLength = indexData.length

    // 获取每一个表单的buffer数据，并存进数组里【这里需要少一次循环】
    for (let i = 0; i < indexDataLength - 1; i++) {
      bufferDatas.push(this.bufferData.slice(indexData[i], indexData[i + 1]))
    }
    return bufferDatas
  }

  /**
   * 处理存储文件的目录
   */
  dealWithDir () {
    const url = path.join(this.url)

    return new Promise((resolve, reject) => {
      fs.exists(url, (exists) => {
        if (exists) {
          resolve()
        } else {
          fs.mkdir(url, (err) => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          })
        }
      })
    })
  }

  /**
   * 写入文件
   */
  writeFile (data, ext) {
    const fName = `${new Date().valueOf()}${Math.ceil(Math.random() * 10000 + 12345)}`
    const url = path.join(`${this.url}/${fName}.${ext}`)

    return new Promise((resolve, reject) => {
      fs.writeFile(url, data, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(url)
        }
      })
    })
  }
}

module.exports = MultipartParser
