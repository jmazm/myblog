/**
 * 开启cms的webpack-dev-server
 * @type {devServer}
 */
const baseServer = require("./base-server")
const config = require("../../config")
const { cmsPort } = config

baseServer(cmsPort)