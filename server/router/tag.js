const Router = require("koa-router")
const tagCtrl = require("../controllers/tag")

const router = new Router()

router.get('/tag', tagCtrl.getTags)
router.get('/tag/:id', tagCtrl.getTagById)
router.post('/tag', tagCtrl.addTag)

module.exports = router