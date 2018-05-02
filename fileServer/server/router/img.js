const Router = require("koa-router")
const imgCtrl = require("../controllers/img")

const router = new Router()

router.get('/v1/:idFolder/img', imgCtrl.getImgs)
router.post('/v1/img', imgCtrl.addImg)
router.put('/v1/img', imgCtrl.modifyImg)
router.del('/v1/img/:idImg', imgCtrl.delImg)

module.exports =  router