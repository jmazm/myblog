const app = require("../../server/devServer")
const request = require("supertest")
const dateformat = require("dateformat")

afterEach(() => {
  app.close() // 当所有测试都跑完了之后，关闭server
})

describe('test api/article.test.js', () => {
  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNTI1Mzk3Mzg1LCJleHAiOjE1MjYwNzQxODV9.NSxVe1kllfR2WD8RqHI6nGl_zHIjr_h7ZqlqqtB54dc'

  // 获取文章
  describe('GET /api/article/(:id)?', () => {

    test('get articles', async () => {
      const res = await request(app)
        .get('/api/article?pageNum=1&pageSize=5')

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('success')
    })

    test('get articles by tag', async () => {
      const res = await request(app)
        .get('/api/article?tag=1&pageNum=1&pageSize=5')

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('success')
    })

    test('get articles by category', async () => {
      const res = await request(app)
        .get('/api/article?category=1&pageNum=1&pageSize=5')

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('success')
    })

    test('get articles which have been published', async () => {
      const res = await request(app)
        .get('/api/article?isPublished=1&pageNum=1&pageSize=5')

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('success')
      expect(res.body.data[0].isPublished).toBe(1)
    })

    test('get articles which have been published', async () => {
      const res = await request(app)
        .get('/api/article?isPublished=0&pageNum=1&pageSize=5')

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('success')
      expect(res.body.data[0].isPublished).toBe(0)
    })

    test('get the detail of article', async () => {
      const res = await request(app)
        .get('/api/article/2')

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('success')
    })
  })

  // 添加文章
  describe('POST /api/article', () => {

    const articleData =  {
      title: '2',
      content: `![progress-02](/progress/progress-02.png)看到我粘出来的代码，
                ### 1.5 demo
                ![progress-03](/progress/progress-02.png)
                ![progress-04](/progress/progress-02.png)
                * [demo](/effects/demo/css/progress/v1-1.html)`,
      foreword: '4',
      Tag_id: 1,
      Category_id: 1,
      imgSrc: '',
      date: dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
      isPublished: 1,
      Admin_id: 1
    }

    test('add a new article: referer does not match, throw 403', async () => {
      const res = await request(app)
        .post('/api/article')
        .set('Referer', 'http://127.0.0.1:8081')
        .send({
          articleData: articleData,
          accessToken: '',
          csrfToken: ''
        })

      expect(res.status).toBe(403)
      expect(res.body.status).toBe('failure')
      expect(res.body.msg).toMatch(/REFERER WRONG/)
    })

    test('add a new article: No access token, throw 401', async () => {
      const res = await request(app)
        .post('/api/article')
        .set({
          Referer: 'http://127.0.0.1:8080'
        })
        .send({
         articleData: articleData,
          accessToken: '',
          csrfToken: ''
        })

      expect(res.status).toBe(401)
      expect(res.body.status).toBe('failure')
      expect(res.body.msg).toMatch(/NO ACCESS AUTHRIZATION|jwt must be provided|jwt is expired/)
    })

    test('add a new article: have an access token, but no csrf token, throw 403', async () => {

      const res = await request(app)
        .post('/api/article')
        .set({
          Authorization: `Bearer ${accessToken}`,
          Cookie: ['USER_SIGN=5718425fcfd498f5116b405e0b8a5c06'],
          Referer: 'http://127.0.0.1:8080'
        })
        .send({
          articleData:articleData,
          csrfToken: ''
        })
      expect(res.status).toBe(403)
      expect(res.body.status).toBe('failure')
      expect(res.body.msg).toMatch(/NO CSRF_TOKEN/)
    })

    test('add a new article: success', async () => {

      const res = await request(app)
        .post('/api/article')
        .set({
          Authorization: `Bearer ${accessToken}`,
          Cookie: ['USER_SIGN=5718425fcfd498f5116b405e0b8a5c06; CSRF_TOKEN=8123888923'],
          Referer: 'http://127.0.0.1:8080'
        })
        .send({
          articleData: articleData,
          csrfToken: '8123888923'
        })

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('success')
    })
  })

  // 修改文章
  describe('PUT /api/article', () => {

    const articleData =  {
      title: '2',
      content: `![progress-02](/progress/progress-02.png)看到我粘出来的代码，`,
      foreword: '4',
      Tag_id: 1,
      Category_id: 1,
      imgSrc: '',
      date: dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
      isPublished: 1,
      Admin_id: 1
    }

    test('modify an article: referer does not match, throw 403', async () => {
      const res = await request(app)
        .put('/api/article')
        .set('Referer', 'http://127.0.0.1:8081')
        .send({
          id: 2,
          articleData: articleData,
          csrfToken: ''
        })

      expect(res.status).toBe(403)
      expect(res.body.status).toBe('failure')
      expect(res.body.msg).toMatch(/REFERER WRONG/)
    })

    test('modify an article: No access token, throw 401', async () => {
      const res = await request(app)
        .put('/api/article')
        .set({
          Referer: 'http://127.0.0.1:8080'
        })
        .send({
          id: 2,
          articleData: articleData,
          csrfToken: ''
        })

      expect(res.status).toBe(401)
      expect(res.body.status).toBe('failure')
      expect(res.body.msg).toMatch(/NO ACCESS AUTHRIZATION|jwt must be provided|jwt is expired/)
    })

    test('modify an article: have an access token, but no csrf token, throw 403', async () => {

      const res = await request(app)
        .put('/api/article')
        .set({
          Authorization: `Bearer ${accessToken}`,
          Cookie: ['USER_SIGN=5718425fcfd498f5116b405e0b8a5c06'],
          Referer: 'http://127.0.0.1:8080'
        })
        .send({
          id: 2,
          articleData:articleData,
          csrfToken: ''
        })
      expect(res.status).toBe(403)
      expect(res.body.status).toBe('failure')
      expect(res.body.msg).toMatch(/NO CSRF_TOKEN/)
    })

    test('modify an article: success', async () => {

      const res = await request(app)
        .put('/api/article')
        .set({
          Authorization: `Bearer ${accessToken}`,
          Cookie: ['USER_SIGN=5718425fcfd498f5116b405e0b8a5c06; CSRF_TOKEN=8123888923'],
          Referer: 'http://127.0.0.1:8080'
        })
        .send({
          id: 2,
          articleData: articleData,
          csrfToken: '8123888923'
        })

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('success')
    })
  })

  // 发布或者取消发布文章
  describe('POST /api/article/publish', () => {

    let postData =  {
      id: 2,
      isPublished: 1
    }

    test('publish or cancel an article: referer does not match, throw 403', async () => {
      const res = await request(app)
        .post('/api/article/publish')
        .set('Referer', 'http://127.0.0.1:8081')
        .send({
          data: postData,
          accessToken: '',
          csrfToken: ''
        })

      expect(res.status).toBe(403)
      expect(res.body.status).toBe('failure')
      expect(res.body.msg).toMatch(/REFERER WRONG/)
    })

    test('publish or cancel an article: No access token, throw 401', async () => {
      const res = await request(app)
        .post('/api/article/publish')
        .set({
          Referer: 'http://127.0.0.1:8080'
        })
        .send({
          data: postData,
          accessToken: '',
          csrfToken: ''
        })

      expect(res.status).toBe(401)
      expect(res.body.status).toBe('failure')
      expect(res.body.msg).toMatch(/NO ACCESS AUTHRIZATION|jwt must be provided|jwt is expired/)
    })

    test('publish or cancel an article: have an access token, but no csrf token, throw 403', async () => {

      const res = await request(app)
        .post('/api/article/publish')
        .set({
          Authorization: `Bearer ${accessToken}`,
          Cookie: ['USER_SIGN=5718425fcfd498f5116b405e0b8a5c06'],
          Referer: 'http://127.0.0.1:8080'
        })
        .send({
          data: postData,
          csrfToken: ''
        })
      expect(res.status).toBe(403)
      expect(res.body.status).toBe('failure')
      expect(res.body.msg).toMatch(/NO CSRF_TOKEN/)
    })

    test('publish an article: success', async () => {
      const res = await request(app)
        .post('/api/article/publish')
        .set({
          Authorization: `Bearer ${accessToken}`,
          Cookie: ['USER_SIGN=5718425fcfd498f5116b405e0b8a5c06; CSRF_TOKEN=8123888923'],
          Referer: 'http://127.0.0.1:8080'
        })
        .send({
          data: postData,
          csrfToken: '8123888923'
        })

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('success')
    })

    test('cancel an article: success', async () => {
      postData.isPublished = 0
      postData.id = 3

      const res = await request(app)
        .post('/api/article/publish')
        .set({
          Authorization: `Bearer ${accessToken}`,
          Cookie: ['USER_SIGN=5718425fcfd498f5116b405e0b8a5c06; CSRF_TOKEN=8123888923'],
          Referer: 'http://127.0.0.1:8080'
        })
        .send({
          data: postData,
          csrfToken: '8123888923'
        })

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('success')
    })
  })

  // 删除文章
  describe('DELETE /api/article/:id', () => {

    test('delete an article: referer does not match, throw 403', async () => {
      const res = await request(app)
        .del('/api/article/1')
        .set('Referer', 'http://127.0.0.1:8081')

      expect(res.status).toBe(403)
      expect(res.body.status).toBe('failure')
      expect(res.body.msg).toMatch(/REFERER WRONG/)
    })

    test('delete an article: No access token, throw 401', async () => {
      const res = await request(app)
        .del('/api/article/1')
        .set({
          Referer: 'http://127.0.0.1:8080'
        })

      expect(res.status).toBe(401)
      expect(res.body.status).toBe('failure')
      expect(res.body.msg).toMatch(/NO ACCESS AUTHRIZATION|jwt must be provided|jwt is expired/)
    })

    test('delete an article: have an access token, but no csrf token, throw 403', async () => {
      const res = await request(app)
        .del('/api/article/1')
        .set({
          Authorization: `Bearer ${accessToken}`,
          Cookie: ['USER_SIGN=5718425fcfd498f5116b405e0b8a5c06'],
          Referer: 'http://127.0.0.1:8080'
        })

      expect(res.status).toBe(403)
      expect(res.body.status).toBe('failure')
      expect(res.body.msg).toMatch(/NO CSRF_TOKEN/)
    })

    test('delete an article: success', async () => {
      const articleRes = await request(app)
        .get('/api/article/1')

      if (articleRes.body.data) {
        const res = await request(app)
          .del('/api/article/1?csrfToken=8123888923')
          .set({
            Authorization: `Bearer ${accessToken}`,
            Cookie: ['USER_SIGN=5718425fcfd498f5116b405e0b8a5c06; CSRF_TOKEN=8123888923'],
            Referer: 'http://127.0.0.1:8080'
          })

        expect(res.status).toBe(200)
        expect(res.body.status).toBe('success')
      }
    })
  })
})

