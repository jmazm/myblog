import axios from 'axios'
import commonConfig from '../../config'

let defaultConfig = {
  baseURI: '/',
  validateStatus: (status) => {
    // return status >= 200 && status < 300 || status === 304
    return status >= 200
  },
  transformResponse: [
    function (data) {
      return data
    }
  ],
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  responseType: 'json'
}

axios.interceptors.response.use(function (res) {
  return res.data
})

export function getRequest (url, config) {
  return axios.get(url, Object.assign({}, defaultConfig, config))
}

export function postRequest (url, data, config) {
  return axios.post(url, data, Object.assign({}, defaultConfig, config))
}

export function delRequest (url, config) {
  return axios.delete(url, Object.assign({}, defaultConfig, config))
}

export function putRequest (url, data, config) {
  return axios.put(url, data, Object.assign({}, defaultConfig, config))
}

let domain = ''

if (process.env.NODE_ENV !== 'development') {
  domain = `http://127.0.0.1:${location.port}`
}

export const api = {
  getAllArticleApi: (pageNum, pageSize) => `${domain}/api/article?pageNum=${pageNum}&pageSize=${pageSize}`,
  getAllArticleByTagApi: (pageNum, pageSize, id) => `${domain}/api/article?tag=${id}&pageNum=${pageNum}&pageSize=${pageSize}`,
  getAllArticleByCategoryApi: (pageNum, pageSize, id) => `${domain}/api/article?category=${id}&pageNum=${pageNum}&pageSize=${pageSize}`,
  getArticleDetailApi: (id) => `${domain}/api/article/${id}`,
  saveArticleApi: `${domain}/api/article`,
  getAllTagApi: `${domain}/api/tag`,
  saveTagApi: `${domain}/api/tag`,
  getAllCategoryApi: `${domain}/api/category`,
  getCommentsApi: `${domain}/api/comment`,
  addCommentApi: `${domain}/api/comment`,
  adminLoginApi: `${domain}/api/login`,
  getCaptchaApi: `${domain}/api/captcha`
}