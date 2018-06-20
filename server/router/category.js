const Router = require("koa-router")
const categoryCtrl = require("../controllers/category")
const { userAuth } = require("../tools/auth")

const router = new Router()

router.get('/category', categoryCtrl.getCategories)
router.post('/category', categoryCtrl.addCategory, userAuth)
router.delete('/category/:id', categoryCtrl.delCategory, userAuth)

module.exports = router