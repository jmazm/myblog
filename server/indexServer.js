
// 监听端口
// https.createServer(config.https.options,app.callback()).listen(config.https.port)

const app = require("./basicConfig")
const common = require("../config")

let port = common.server.indexServerPort

app.listen(port, () => {
  console.log(`${process.version} listening on port ${port} (${app.env}/${common.dbConfig.database})`)
})
