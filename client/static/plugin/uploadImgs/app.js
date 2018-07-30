const http = require('http')
const fs = require('fs')
const path = require('path')
const formidable = require('./multipart_parser.js')

const server = http.createServer()

server.on('request', (req, res) => {
  const url = req.url
  // 处理预检请求
  if (req.method.toLowerCase() === 'options') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
    res.end(JSON.stringify({
      method: req.method
    }))
  }

  // 处理真正的上传照片的请求
  if (url === '/upload') {
    new formidable(req, (fields, files) => {
      // 跨域
      res.setHeader('Access-Control-Allow-Origin', '*')

      res.write(JSON.stringify({
        fields: fields,
        files: files
      }))

      res.end()
    }, path.join(__dirname, '/uploads'))
  }
})

server.listen(3000)