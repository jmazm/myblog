import app from '../../server/devServer'
import request from 'supertest'

describe('test article api', () => {
  const server = request(app)
  describe('test GET/ article', () => {
    server
      .get('/api/article?pageNum=1&pageSize=5')
      .end((err, res) => {
        if (err) return err
        console.log(res)
      })
  })
})