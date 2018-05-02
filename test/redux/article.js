import {actions, actionTypes, reducer} from '../../client/redux/reducer/articleReducer'

describe('test article', () => {

  describe ('test article actions', () => {
    test('should create an action to get all articles', () => {
      const paramsObj = {
        pageNum: 1,
        pageSize: 5,
        tag: 'aa',
        category: 'bb'
      }
      const expectedAction = {
        type: actionTypes.GET_ALL_ARTICLES,
        paramsObj
      }
      expect(actions.get_all_articles(paramsObj)).toEqual(expectedAction)
    })

    test('should create an action to get article detail', () => {
      const id = 1
      const expectedAction = {
        type: actionTypes.GET_ARTICLE_DETAIL,
        id
      }
      expect(actions.get_article_detail(id)).toEqual(expectedAction)
    })
  })
  // describe('test article reducer', () => {
  //   test('should return the initial state', () => {
  //     expect(reducer(undefined, {})).toEqual(
  //       [
  //
  //       ]
  //     )
  //   })
  // })
})