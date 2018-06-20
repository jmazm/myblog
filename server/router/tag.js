const Router = require("koa-router")
const tagCtrl = require("../controllers/tag")
const { userAuth } = require("../tools/auth")

const router = new Router()

router.get('/tag', tagCtrl.getTags)
router.post('/tag', tagCtrl.addTag, userAuth)
router.delete('/tag/:id', tagCtrl.delTag, userAuth)

module.exports = router