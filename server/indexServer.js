
// 监听端口

const app = require("./basicConfig")
const https = require("https")
const fs = require("fs")
const config = require("../config")
const port = config.server.indexServerPort


// app.listen(port, () => {
//   console.log(`${process.version} listening on port ${port} (${app.env}/${common.dbConfig.database})`)
// })


const options = {
  key: fs.readFileSync(config.auth.key),
  cert: fs.readFileSync(config.auth.cert)
}

https.createServer(options, app.callback()).listen(port)

console.log(`${process.version} listening on port ${port} (${app.env}/${config.dbConfig.database})`)