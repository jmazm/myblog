/**
 * 开启index的webpack-dev-server
 * @type {devServer}
 */
const baseServer = require("./base-server")
const config = require("../../config")
const { indexPort } = config

baseServer(indexPort)