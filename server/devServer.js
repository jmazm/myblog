const app = require("./basicConfig")
const common = require("../config")

let port = common.dev.serverPort


// export default app.listen(port, () => {
//   console.log(`${process.version} listening on port ${port} (${app.env}/${common.dbConfig.database})`)
// })

module.exports = app.listen(port, () => {
  console.log(`${process.version} listening on port ${port} (${app.env}/${common.dbConfig.database})`)
})




