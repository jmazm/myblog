const Router = require("koa-router")
const img = require("./img")
const folder = require("./folder")

const router = new Router()

router.use(img.routes(), img.allowedMethods())
router.use(folder.routes(), folder.allowedMethods())

module.exports =  router