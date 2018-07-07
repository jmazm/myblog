const Router = require("koa-router")
const fs = require("fs")
const path = require("path")
const articleCtrl = require('../controllers/article')
const categoryCtrl = require("../controllers/category")
const commentCtrl = require('../controllers/comment')
const tagCtrl = require("../controllers/tag")
const userCtrl = require("../controllers/user")
const { userAuth } = require("../tools/auth")
const captcha = require("../tools/captcha")


// 同构页面
const router = new Router()

router.get('/', async (ctx) => {
  const data = await fs.readFileSync(path.resolve(process.cwd(), './dist/cms/index.html'), 'utf8')

  ctx.body = data
})


// 获取验证码
router.get('/api/captcha', captcha.createCaptcha)

/**
 * HTTP方法
 * // ===
 * 1. GET：用于请求服务器发送某个资源
 * 2. POST：向服务器输入数据 - 发送表单数据
 * 3. PUT：向服务器写入文档
 * 4. DELETE：请服务器删除请求 URL 所指定的资源。
 * 5. HEAD：只返回首部，不会返回实体的主体部分
 * 6. TRACE：TRACE 方法允许客户端在最终将请求发送给服务器时，看看请求变成了什么样子。
 * 7. OPTIONS：询问服务器通常支持哪些方法，或者对某些特殊资源支持哪些方法
 * === //
 */

/**
 * GET和POST的区别
 * // ===
 * 1. 用途：get请求资源，post传送数据
 * 2. 参数形式：get放在query，post放在请求体
 * 3. 传输的数据大小：post发送的数据相较于get来说较大
 * 4. 传输的数据形式：post不限，get要经encodeURIComponent加密，decodeURIComponent解密
 * 5. 安全性：post相较于get来说要安全得多
 * 6. 缓存：get可缓存，post不可缓存
 * === //
 */

/**
 * RESTFul架构
 * // ===
 * 1. 名称
    REST - Representational State Transfer - 表现层状态转化
    如果一个架构符合REST原则，就称它为RESTful架构。
 * 2. 资源 - Resources
   2.1 表现层：指的是资源的表现层；
   2.2 资源：
    指的是网络上的一个实体，或者说是网络上的一个具体信息；
    可以用一个URI（统一资源定位符）指向它，每种资源对应一个特定的URI。
 * 3. 表现层 - Representation
   把资源具体呈现出来的形式，叫做它的“表现层”。比如，文本可以用txt/html/xml/json格式表现。
   URI只代表资源的实体，不代表它的形式。如 .html这个后缀名就表示格式，属于表现层的范畴。
   但URI只表示资源的位置。某资源的具体表现形式应该有头信息 Accept 和 Content-Type 决定，这两个字段才是对"表现层"的描述。
 * 4. 状态转化 - State Transfer
   HTTP协议是一个无状态协议，即所有状态都保存在服务器端。
   客户端如果想要操作服务器，只能通过某些手段 - HTTP协议中的四个方法（GET、POST、PUT、DELETE）让服务器端发生状态转化，
   这种转化是建立在表现层之上的，所以就是"表现层状态转化"。
 * 5. 设计误区
   5.1 URI不要包含动词，动词应该用4个HTTP动词代替
      例子：/posts/show/1  ===》 GET /posts/1
   5.2 如果某些动作是HTTP动词表示不了的，你就应该把动作做成一种资源，即可以转化成query
      例子：POST /accounts/1/transfer/500/to/2 ===》 POST /transaction?from=1&to=2&amount=500.00
   5.3 不要在URI中添加版本号【因为不同的版本，可以理解成同一种资源的不同表现形式，所以应该采用同一个URI；版本号可以在HTTP请求头信息的Accept字段中进行区分】
      例子：http://www.example.com/app/1.0/foo  ===》 Accept: vnd.example-com.foo+json; version=1.0
 * 6. 总结RESTful架构
   6.1 每一个URI代表一种资源
   6.2 客户端和服务端之间传递这种资源的某种表现层
   6.3 客户端通过 GET、POST、PUT、DELETE 四个HTTP动词，对服务器端资源进行操作，实现"表现层状态转化"。
 * === //
 */

// 获取文章
router.get('/api/article', articleCtrl.getArticle, userAuth)
// 获取文章详情
router.get('/api/article/:id', articleCtrl.getArticleDetail, userAuth)
// 添加文章
router.post('/api/article', articleCtrl.addArticle, userAuth)
// 修改文章
router.put('/api/article', articleCtrl.modifyArticle, userAuth)
// 删除文章
router.delete('/api/article/:id', articleCtrl.delArticle, userAuth)



// 类别
router.get('/api/category', categoryCtrl.getCategories, userAuth)
router.post('/api/category', categoryCtrl.addCategory, userAuth)
router.delete('/api/category/:id', categoryCtrl.delCategory, userAuth)


// 获取评论
router.get('/api/comment', commentCtrl.getComments)

// 标签
router.get('/api/tag', tagCtrl.getTags, userAuth)
router.post('/api/tag', tagCtrl.addTag, userAuth)
router.delete('/api/tag/:id', tagCtrl.delTag, userAuth)

// 登录
router.post('/api/login', userCtrl.login)
// 注销
router.get('/api/logout', userCtrl.logout)

module.exports = router

