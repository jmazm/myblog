const app = require("./basicConfig")
const common = require("../config")

let port = common.server.cmsServerPort

app.listen(port, () => {
  console.log(`${process.version} listening on port ${port} (${app.env}/${common.dbConfig.database})`)
})