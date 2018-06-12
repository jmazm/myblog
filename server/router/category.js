const Router = require("koa-router")
const categoryCtrl = require("../controllers/category")

const router = new Router()

router.get('/category', categoryCtrl.getCategories)
router.get('/category/:id', categoryCtrl.getCategory)
router.post('/category', categoryCtrl.addCategory)
router.delete('/category/:id', categoryCtrl.delCategory)

module.exports = router