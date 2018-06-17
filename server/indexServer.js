/**
 * 这里使用http，而不是用https，原因在于https默认端口为443，如果用https，那么其他服务就用不了
 * 而通过ngigx，可以将http转移到https请求
 */

/**
 * HTTP 和 HTTPS的异同
 * 不同点：
 1、https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。

 2、http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。

 3、http和https使用的是完全不同的连接方式，默认端口号不一样，前者是80，后者是443。

 4、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。
 */



/**
 * http
 */
const app = require("./basicConfig")
// const https = require("https")
// const fs = require("fs")
const config = require("../config")
const port = config.server.indexServerPort


app.listen(port, () => {
  console.log(`${process.version} listening on port ${port} (${app.env}/${config.dbConfig.database})`)
})

/**
 * https
 * // ===
 * 组成：HTTP + SSL/TLS
 * === //
 */



// const options = {
//   key: fs.readFileSync(config.auth.key),
//   cert: fs.readFileSync(config.auth.cert)
// }
//
// https.createServer(options, app.callback()).listen(port)
//
// console.log(`${process.version} listening on port ${port} (${app.env}/${config.dbConfig.database})`)