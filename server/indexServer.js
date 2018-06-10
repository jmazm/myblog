/**
 * 这里使用http，而不是用https，原因在于https默认端口为443，如果用https，那么其他服务就用不了
 * 而通过ngigx，可以将http转移到https请求
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
 */

// const options = {
//   key: fs.readFileSync(config.auth.key),
//   cert: fs.readFileSync(config.auth.cert)
// }
//
// https.createServer(options, app.callback()).listen(port)
//
// console.log(`${process.version} listening on port ${port} (${app.env}/${config.dbConfig.database})`)

