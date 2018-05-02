const Router = require("koa-router")
const folderCtrl = require("../controllers/folder")

const router = new Router()

router.get('/v1/folder', folderCtrl.getFolders)
router.post('/v1/folder', folderCtrl.addFolder)
router.put('/v1/folder', folderCtrl.modifyFolder)
router.del('/v1/folder/:idFolder', folderCtrl.delFolder)

module.exports =  router