import {take, call, put} from 'redux-saga/effects'
import {getRequest, putRequest, postRequest, delRequest, api} from '../fetch/fetch'
import {actionTypes as IndexActionTypes} from '../redux/reducer'
import {actionTypes as ArticleActionTypes} from '../redux/reducer/articleReducer'

/**
 * 获取所有文章
 * @param pageNum
 * @param pageSize
 * @return {*}
 */
function* getAllArticle (paramsObj) {
  const {pageNum, pageSize} = paramsObj

  try {
      if (paramsObj.tag) {
        return yield call(getRequest, api.getAllArticleByTagApi(pageNum, pageSize, paramsObj.tag))
      } else if (paramsObj.category) {
        return yield call(getRequest, api.getAllArticleByCategoryApi(pageNum, pageSize, paramsObj.category))
      } else {
        return yield call(getRequest, api.getAllArticleApi(pageNum, pageSize))
      }

  } catch (err) {
      console.log(err)
  }
}

export function* getAllArticleFlow () {
  while (true) {

    let req = yield take(ArticleActionTypes.GET_ALL_ARTICLES)

    let res = yield call(getAllArticle, req.paramsObj)
    
    // 判断返回的响应
    if (res.status === 'success') {
      // 存储数据
      yield put({
        type: ArticleActionTypes.RESPONSE_ALL_ARTICLES,
        data: res.data,
        total: res.total
      })
    } else {
      console.log(err)
    }
  }
}


/**
 * 保存文章（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* saveArticle (data) {
  try {
    // let id = yield select (state => state.articles.id)
    // if (id) {
    //   data.id = id
    //   // 更新文章
    //   return yield call(putRequest, '/v1/article', data)
    // } else {
    //   console.log(data)
    //
    //   // 添加文章
    //   return yield call(postRequest, api.saveArticleApi, data)
    // }
    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    return yield call(postRequest, api.saveArticleApi, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (err) {
    // 报错处理
    console.log(err)
  }
}

export function* saveArticleFlow () {
  while (true) {
    let request = yield take(ArticleActionTypes.POST_SAVE_ARTICLE)
    let articleData = request.data.articleData

    // if (articleData.title === '') {
    //   yield put({
    //     type: IndexActionTypes.SET_MESSAGE,
    //     msgContent: '请输入文章标题',
    //     msgType: 0
    //   })
    // } else if (articleData.content === '') {
    //   yield put({
    //     type: IndexActionTypes.SET_MESSAGE,
    //     msgContent: '请输入文章内容',
    //     msgType: 0
    //   })
    // } else if (articleData.Tag_id === '') {
    //   yield put({
    //     type: IndexActionTypes.SET_MESSAGE,
    //     msgContent: '请输入文章标签',
    //     msgType: 0
    //   })
    // } else if (articleData.Category_id === '') {
    //   yield put({
    //     type: IndexActionTypes.SET_MESSAGE,
    //     msgContent: '请输入文章类别',
    //     msgType: 0
    //   })
    // }

    if (articleData.title && articleData.content && articleData.Category_id && articleData.Category_id) {
      let res = yield call(saveArticle, request.data)
      // 判断返回的响应
      if (res.status === 'success') {
        // yield put({
        //   type: IndexActionTypes.SET_MESSAGE,
        //   msgContent: res.message,
        //   msgType: 1
        // })
        alert('添加文章成功')
        const form = document.getElementById('newArticleForm')
        form.title.value = ''
        form.imgSrc.value = ''
        form.foreword.value = ''
        form.content.value = ''
      } else {
        // yield put({
        //   type: IndexActionTypes.SET_MESSAGE,
        //   msgContent: res.message,
        //   msgType: 0
        // });
        alert(res.msg)
        // location.href = '/#/admin/login'
      }
    }
  }
}

/**
 * 获取文章详情（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* getArticleDetail (id) {
  // 开始进行异步请求
  try {
    return yield call(getRequest, api.getArticleDetailApi(id))
  } catch (err) {
    // 报错处理
   console.log(err)
  }
}

export function* getArticleDetailFlow () {
  while (true) {

    let req = yield take(ArticleActionTypes.GET_ARTICLE_DETAIL)

    // 拿回来的响应
    let res = yield call(getArticleDetail, req.id)

    // 判断返回的响应
    if (res.status === 'success') {
      // 存储数据
      yield put({
        type: ArticleActionTypes.RESPONSE_ARTICLE_DETAIL,
        data: res.data
      })
    } else {
      alert(res.msg)
    }
  }
}

function* deleteArticleById (id) {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN')

    return yield call(delRequest, api.deleteArticleApi(id),  {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (err) {
      console.log(err)
  }
}

export function* deleteArticleByIdFlow () {
  while (true) {
    let req = yield take(ArticleActionTypes.DELETE_ARTICLE)

    let res = yield call(deleteArticleById, req.id)

    if (res.status === 'success') {
      alert('删除成功')
    } else {
      alert(`删除失败，原因: ${res.msg}`)
    }
  }
}