import {fork} from 'redux-saga/effects'
import {getAllImgsFlow} from './imgSaga'
import {getAllFolderFlow} from './folderSaga'

export default function* rootSage () {
  yield fork(getAllImgsFlow)
  yield fork(getAllFolderFlow)
}
