import {take, call, put} from 'redux-saga/effects'
import {getRequest, postRequest, putRequest} from '../lib/fetch'
import {actionTypes as IndexTypes} from '../redux/reducer'
import {actionTypes as FolderTypes} from '../redux/reducer/folderReducer'

/**
 * 获取所有文件夹数据
 * @return {*}
 */

function* getAllFolders () {
  yield put({
    type: IndexTypes.FETCH_START
  })

  try {
    return yield call(getRequest, `/v1/folder`)
  } catch (err) {
    // 报错处理
    yield put({
      type: IndexTypes.SET_MESSAGE,
      msgContent: '网络请求错误',
      msgType: 0
    })
  } finally {
    // 异步请求结束
    yield put({
      type: IndexTypes.FETCH_END
    })
  }
}

export function* getAllFolderFlow () {
  while (true) {

    yield take(FolderTypes.GET_FOLDERS)

    // 拿回来的响应
    let res = yield call(getAllFolders)

    // 判断返回的响应
    if (res.status === 'success') {
      // 存储数据
      yield put({
        type: FolderTypes.SET_FOLDERS,
        data: res.data
      })
    } else {
      yield put({
        type: IndexTypes.SET_MESSAGE,
        msgContent: res.message,
        msgType: 0
      });
    }
  }
}