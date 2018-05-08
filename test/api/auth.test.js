const app = require("../../server/devServer")
const request = require("supertest")

afterEach(() => {
  app.close() // 当所有测试都跑完了之后，关闭server
})

describe('test api/auth.test.js login', () => {

  // 用户名不存在
  test('Failed to login if typing aaa & 1234', async () => {
    const res = await request(app)
      .post('/api/login')
      .set({
        Referer: 'http://127.0.0.1:8080'
      })
      .send({
        'name': 'aaa',
        'password': '1234'
      })

    expect(res.status).toBe(200)
    expect(res.body.status).toBe('failure')
    expect(res.body.msg).toMatch(/USER DOES NOT EXIST/)
  })

  // 用户名存在，密码错误
  test('Failed to login if typing admin & 1234', async () => {
    const res = await request(app)
      .post('/api/login')
      .set({
        Referer: 'http://127.0.0.1:8080'
      })
      .send({
        'name': 'admin',
        'password': '1234'
      })

    expect(res.status).toBe(200)
    expect(res.body.status).toBe('failure')
    expect(res.body.msg).toBe('PASSWORD WRONG')
  })

  // 登录成功
  test('Succeeded to login if typing admin & d30ef94b82bc36d0eac9d83064177a3b', async () => {
    const res = await request(app)
      .post('/api/login')
      .set({
        Referer: 'http://127.0.0.1:8080'
      })
      .send({
        'name': 'admin',
        'password': 'd30ef94b82bc36d0eac9d83064177a3b'
      })

    expect(res.status).toBe(200)
    expect(res.body.status).toBe('success')
  })
})

