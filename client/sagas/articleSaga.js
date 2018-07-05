/**
 * // ===
 * 1. call(fn, ...args) - 创建一条描述结果的信息 - call 只是一个返回纯文本对象的函数而已。
 * 2. take() - 创建一个 Effect 描述信息，用来命令 middleware 在 Store 上等待指定的 action。 在发起与 pattern 匹配的 action 之前，Generator 将暂停。
 * 3. put() - 创建一个 Effect 描述信息，用来命令 middleware 向 Store 发起一个 action。 这个 effect 是非阻塞型的，并且所有向下游抛出的错误（例如在 reducer 中），都不会冒泡回到 saga 当中。
 * === //
 */

import { take, call, put } from 'redux-saga/effects'
import { getRequest, postRequest, delRequest, putRequest, api } from '../fetch/fetch'
import { actionTypes as ArticleActionTypes } from '../redux/reducer/articleReducer'
import { actionTypes as GlobalActionTypes } from '../redux/reducer/globalReducer'
import Cookie from 'js-cookie'

/**
 * 获取所有文章
 * @param pageNum
 * @param pageSize
 * @return {*}
 */
function* getAllArticle (paramsObj) {
  // 开始进行异步请求
  yield put({
    type: GlobalActionTypes.FETCH_START
  })

  try {
    const { pageNum, pageSize } = paramsObj

    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const csrfToken = Cookie.get('CSRF_TOKEN')

    // 标签
    if (paramsObj.tag) {
      return yield call(getRequest, api.getAllArticleByTagApi(pageNum, pageSize, paramsObj.tag),  {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-csrf-token': csrfToken
        }
      })
    }
    // 类别
    else if (paramsObj.category) {
      return yield call(getRequest, api.getAllArticleByCategoryApi(pageNum, pageSize, paramsObj.category),  {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-csrf-token': csrfToken
        }
      })
    }
    // 文章名称
    else if (paramsObj.title) {
      return yield call(getRequest, api.getAllArticleByTitleApi(pageNum, pageSize, paramsObj.title),  {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-csrf-token': csrfToken
        }
      })
    }
    // 全部文章
    else {
      return yield call(getRequest, api.getAllArticleApi(pageNum, pageSize),  {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-csrf-token': csrfToken
        }
      })
    }

  } catch (err) {
    // 报错处理
    yield put({
      type: GlobalActionTypes.SET_MESSAGE,
      message: {
        type: 0,
        info: err.message
      }
    })
  } finally {
    // 异步请求结束
    yield put({
      type: GlobalActionTypes.FETCH_END
    })
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
      yield put({
        type: GlobalActionTypes.SET_MESSAGE,
        msgType: 0,
        msgInfo: res.message
      })
    }
  }
}

/**
 * 保存文章（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* saveArticle (data) {
  // 开始进行异步请求
  yield put({
    type: GlobalActionTypes.FETCH_START
  })

  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    const csrfToken = Cookie.get('CSRF_TOKEN')

    return yield call(postRequest, api.saveArticleApi, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-csrf-token': csrfToken
      }
    })
  } catch (err) {
    // 报错处理
    yield put({
      type: GlobalActionTypes.SET_MESSAGE,
      msgType: 0,
      msgInfo: err.message
    })
  } finally {
    // 异步请求结束
    yield put({
      type: GlobalActionTypes.FETCH_END
    })
  }
}

export function* saveArticleFlow () {
  while (true) {
    let request = yield take(ArticleActionTypes.POST_SAVE_ARTICLE)
    let articleData = request.data.articleData

    if (articleData.title && articleData.content && articleData.Category_id && articleData.Category_id) {
      let res = yield call(saveArticle, request.data)
      // 判断返回的响应
      if (res.status === 'success') {
        alert('添加文章成功')
      } else {
        yield put({
          type: GlobalActionTypes.SET_MESSAGE,
          msgType: 0,
          msgInfo: res.message
        })
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
  yield put({
    type: GlobalActionTypes.FETCH_START
  })

  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const csrfToken = Cookie.get('CSRF_TOKEN')

    return yield call(getRequest, api.getArticleDetailApi(id),  {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-csrf-token': csrfToken
      }
    })
  } catch (err) {
    // 报错处理
    yield put({
      type: GlobalActionTypes.SET_MESSAGE,
      msgType: 0,
      msgInfo: err.message
    })
  } finally {
    // 异步请求结束
    yield put({
      type: GlobalActionTypes.FETCH_END
    })
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
      yield put({
        type: GlobalActionTypes.SET_MESSAGE,
        msgType: 0,
        msgInfo: res.message
      })
    }
  }
}

function* deleteArticleById (id, pageNum, pageSize) {
  // 开始进行异步请求
  yield put({
    type: GlobalActionTypes.FETCH_START
  })

  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    const csrfToken = Cookie.get('CSRF_TOKEN')

    return yield call(delRequest, api.deleteArticleApi(id, pageNum, pageSize),  {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-csrf-token': csrfToken
      }
    })
  } catch (err) {
    // 报错处理
    yield put({
      type: GlobalActionTypes.SET_MESSAGE,
      msgType: 0,
      msgInfo: err.message
    })
  } finally {
    // 异步请求结束
    yield put({
      type: GlobalActionTypes.FETCH_END
    })
  }
}

export function* deleteArticleByIdFlow () {
  while (true) {
    let req = yield take(ArticleActionTypes.DELETE_ARTICLE)

    let res = yield call(deleteArticleById, req.id, req.pageNum, req.pageSize)

    if (res.status === 'success') {
      alert('删除成功')

      // 存储数据
      yield put({
        type: ArticleActionTypes.RESPONSE_ALL_ARTICLES,
        data: res.data,
        total: res.total
      })
    } else {
      yield put({
        type: GlobalActionTypes.SET_MESSAGE,
        msgType: 0,
        msgInfo: res.message
      })
    }
  }
}

/**
 * 修改文章（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* modifyArticle (pageNum, pageSize, data) {
  // 开始进行异步请求
  yield put({
    type: GlobalActionTypes.FETCH_START
  })

  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    const csrfToken = Cookie.get('CSRF_TOKEN')

    return yield call(putRequest, api.modifyArticleApi(pageNum, pageSize), data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-csrf-token': csrfToken
      }
    })
  } catch (err) {
    // 报错处理
    yield put({
      type: GlobalActionTypes.SET_MESSAGE,
      msgType: 0,
      msgInfo: err.message
    })
  } finally {
    // 异步请求结束
    yield put({
      type: GlobalActionTypes.FETCH_END
    })
  }
}

export function* modifyArticleFlow () {
  while (true) {
    let request = yield take(ArticleActionTypes.PUT_MODIFY_ARTICLE)
    let articleData = request.data.articleData

    if (articleData.title && articleData.content && articleData.Category_id && articleData.Category_id) {
      let res = yield call(modifyArticle, request.pageNum, request.pageSize, request.data)

      // 判断返回的响应
      if (res.status === 'success') {
        alert('修改文章成功！')

        // 存储数据
        yield put({
          type: ArticleActionTypes.RESPONSE_ALL_ARTICLES,
          data: res.data,
          total: res.total
        })
      } else {
        yield put({
          type: GlobalActionTypes.SET_MESSAGE,
          msgType: 0,
          msgInfo: res.message
        })
      }
    }
  }
}