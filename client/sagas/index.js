import {fork} from 'redux-saga/effects'
import {saveTagFlow, getTagsFlow} from './tagSaga'
import {saveCategoryFlow, getCategoriesFlow} from './categorySaga'
import {getAllArticleFlow, getArticleDetailFlow, saveArticleFlow} from './articleSaga'
import {getCommentsFlow} from './commentSaga'

export default function* rootSage () {
  yield fork(saveArticleFlow)
  yield fork(saveTagFlow)
  yield fork(getTagsFlow)
  // yield fork(saveCategoryFlow)
  yield fork(getCategoriesFlow)
  yield fork(getArticleDetailFlow)
  yield fork(getAllArticleFlow)
  yield fork(getCommentsFlow)
}
