const createServer = require("./config")
const common = require("../../config")
const indexConfig = require("../config/webpack.index.dev.config")

createServer(indexConfig, common.server.indexServerPort)