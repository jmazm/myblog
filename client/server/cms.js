const createServer = require("./config")
const common = require("../../config")
const cmsConfig = require("../config/webpack.cms.dev.config")

createServer(cmsConfig, common.server.cmsServerPort)