import {actions, actionTypes, reducer} from '../../client/redux/reducer/articleReducer'

describe('test article redux ', () => {

  describe ('test article action creators', () => {
    test('should create an action to get all articles', () => {
      // 没有分类或者分标签获取文章列表
      let paramsObj = {
        pageNum: 1,
        pageSize: 5
      }

      expect(actions.get_all_articles(paramsObj)).toEqual({
        type: actionTypes.GET_ALL_ARTICLES,
        paramsObj
      })

      // 按标签获取文章列表
      paramsObj = {
        pageNum: 1,
        pageSize: 5,
        tag: 1,
      }

      expect(actions.get_all_articles(paramsObj)).toEqual({
        type: actionTypes.GET_ALL_ARTICLES,
        paramsObj
      })

      // 按类别获取文章列表
      paramsObj = {
        pageNum: 1,
        pageSize: 5,
        category: 2,
      }
      expect(actions.get_all_articles(paramsObj)).toEqual({
        type: actionTypes.GET_ALL_ARTICLES,
        paramsObj
      })
    })

    test('should create an action to get an article detail', () => {
      const id = 1
      const expectedAction = {
        type: actionTypes.GET_ARTICLE_DETAIL,
        id
      }
      expect(actions.get_article_detail(id)).toEqual(expectedAction)
    })

    test('should create an action to get articles published or unpublished', async () => {
      let paramObj = {
        pageNum: 1,
        pageSize: 5,
        isPublished: 1 // 已出版
      }

      expect(actions.get_is_or_not_pubished_articles(paramObj)).toEqual({
        type: actionTypes.GET_IS_OR_NOT_PUBLISHED_ARTICLES,
        paramObj
      })

      paramObj.isPublished = 0 // 未出版

      expect(actions.get_is_or_not_pubished_articles(paramObj)).toEqual({
        type: actionTypes.GET_IS_OR_NOT_PUBLISHED_ARTICLES,
        paramObj
      })
    })
  })

  describe('test article reducer', () => {
    test('should return the initial state', () => {
      const initialState = {
        tag: [], // 文章标签
        category: [], // 文章类别
        articleList: [], // 文章列表
        articleDetail: {}, // 文章细节
        currentPage: 1, // 当前页
        total: 0, // 文章总数
        newArticleData: {
          title: '', // 文章标题
          content: '', // 文章内容
          Tag_id: 1, // 文章标签
          Category_id: 1, // 文章类别
          id: '', // 文章ID
          imgSrc: '', // 文章列表要展示的图片地址
          foreword: '' // 文章前言
        }
      }
      expect(reducer(undefined, {})).toEqual(initialState)
    })
    test('should handle GET_IS_OR_NOT_PUBLISHED_ARTICLES', () => {
      const paramObj = {}
      expect(reducer({
        articleList: []
      }, {
        type: actions.GET_IS_OR_NOT_PUBLISHED_ARTICLES,
        paramObj
      })).toEqual({
        articleList:[]
      })
    })
  })
})