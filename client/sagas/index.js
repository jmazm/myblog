import {fork} from 'redux-saga/effects'
import {saveTagFlow, getTagsFlow} from './tagSaga'
import {getCategoriesFlow} from './categorySaga'
import {getAllArticleFlow, getArticleDetailFlow, saveArticleFlow, deleteArticleByIdFlow} from './articleSaga'
import {getCommentsFlow} from './commentSaga'

export default function* rootSage () {
  yield fork(getAllArticleFlow)
  yield fork(getArticleDetailFlow)
  yield fork(deleteArticleByIdFlow)
  yield fork(saveArticleFlow)
  yield fork(saveTagFlow)
  yield fork(getTagsFlow)
  yield fork(getCategoriesFlow)
  yield fork(getCommentsFlow)
}
