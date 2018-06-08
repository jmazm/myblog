import {take, call, put, select} from 'redux-saga/effects'
import {getRequest, postRequest, putRequest, api} from '../fetch/fetch'
import {actionTypes as IndexActionTypes} from '../redux/reducer'
import {actionTypes as TagActionTypes} from '../redux/reducer/tagReducer'

/**
 * 添加/修改标签（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* saveTag (data) {
  // 开始进行异步请求
  yield put({
    type: IndexActionTypes.FETCH_START
  })
  try {
    let id = yield select (state => state.tag.id)

    if (id) {
      data.id = id
      // 更新标签
      return yield call(putRequest, '/v1/tag', data)
    } else {
      // 添加标签
      return yield call(postRequest, '/v1/tag', data)
    }

  } catch (err) {
    // 报错处理
    yield put({
      type: IndexActionTypes.SET_MESSAGE,
      msgContent: '网络请求错误',
      msgType: 0
    })
  } finally {
    // 异步请求结束
    yield put({
      type: IndexActionTypes.FETCH_END
    })
  }
}

/**
 * 获取标签（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* getTags () {
  // 开始进行异步请求
  yield put({
    type: IndexActionTypes.FETCH_START
  })
  try {
    return yield call(getRequest, api.getAllTagApi)
  } catch (err) {
    // 报错处理
    yield put({
      type: IndexActionTypes.SET_MESSAGE,
      msgContent: '网络请求错误',
      msgType: 0
    })
  } finally {
    // 异步请求结束
    yield put({
      type: IndexActionTypes.FETCH_END
    })
  }
}

export function* saveTagFlow () {
  while (true) {
    let request = yield take(TagActionTypes.SAVE_TAG)

    if (request.data.name === '') {
      yield put({
        type: IndexActionTypes.SET_MESSAGE,
        msgContent: '请输入标签名',
        msgType: 0
      })
    } else {
      let res = yield call(saveTag, request.data)

      // 判断返回的响应
      if (res.code === 0) {
        yield put({
          type: IndexActionTypes.SET_MESSAGE,
          msgContent: res.message,
          msgType: 1
        })
      } else {
        yield put({
          type: IndexActionTypes.SET_MESSAGE,
          msgContent: res.message,
          msgType: 0
        });
      }
    }
  }
}

export function* getTagsFlow () {
  while (true) {
    yield take(TagActionTypes.GET_ALL_TAGS)

    // 拿回来的响应
    let res = yield call(getTags)

    // 判断返回的响应
    if (res.status === 'success') {
      // 存储数据
      yield put({
        type: TagActionTypes.SET_TAGS,
        data: res.data
      })
    } else {
      yield put({
        type: IndexActionTypes.SET_MESSAGE,
        msgContent: res.message,
        msgType: 0
      });
    }
  }
}