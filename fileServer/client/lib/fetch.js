import axios from 'axios'

axios.interceptors.response.use(function(res){
  //相应拦截器
  return res.data;
});

export function getRequest (url) {
  return axios.get(url)
}

export function postRequest (url, data) {
  return axios.post(url, data)
}

export function putRequest (url, data) {
  return axios.put(url, data)
}