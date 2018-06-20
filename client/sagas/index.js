import { fork } from 'redux-saga/effects'
import { saveTagFlow, getTagsFlow, delTagFlow } from './tagSaga'
import { getCategoriesFlow, saveCategoryFlow, delCategoryFlow } from './categorySaga'
import { getAllArticleFlow, getArticleDetailFlow, saveArticleFlow, deleteArticleByIdFlow, modifyArticleFlow } from './articleSaga'
import { getCommentsFlow } from './commentSaga'

export default function* rootSage () {
  yield fork(getAllArticleFlow)
  yield fork(getArticleDetailFlow)
  yield fork(deleteArticleByIdFlow)
  yield fork(modifyArticleFlow)
  yield fork(saveArticleFlow)
  yield fork(saveTagFlow)
  yield fork(getTagsFlow)
  yield fork(delTagFlow)
  yield fork(getCategoriesFlow)
  yield fork(saveCategoryFlow)
  yield fork(delCategoryFlow)
  yield fork(getCommentsFlow)
}
