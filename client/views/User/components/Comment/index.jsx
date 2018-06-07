import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Validator, reg } from '../../../../lib/verification'

import { actions as CommentActions } from '../../../../redux/reducer/commentReducer'
import { postRequest, api } from '../../../../fetch/fetch'

import './style.css'

const {get_all_comments} = CommentActions

class Comment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: [],
      commentsData: {
        name: '',
        email: '',
        website:  '',
        content: '',
        Article_id: 0
      },
      sign: ''
    }

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
    this.handlePublishClick = this.handlePublishClick.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }
  validateForm (form) {
    const validator = new Validator()

    // 昵称
    validator.add(form.name, [
      {
        strategy: 'isEmpty',
        errorMsg: '昵称不能为空'
      }
    ])

    // 邮箱
    validator.add(form.email, [
      {
        strategy: 'isEmpty',
        errorMsg: '邮箱不能为空'
      },
      {
        strategy: 'isEmail',
        errorMsg: '邮箱格式错误'
      }
    ])

    // 网址
    if (form.website.value.length > 0) {
      validator.add(form.website, [
        {
          strategy: 'isWebsite',
          errorMsg: '网址格式不正确'
        }
      ])
    }

    // 评论内容
    validator.add(form.content, [
      {
        strategy: 'isEmpty',
        errorMsg: '内容不能为空'
      }
    ])

    const errorMsg = validator.start()
    return errorMsg
  }
  handleOnChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      commentsData: Object.assign({}, this.state.commentsData, {
        [name]: reg.replaceHtml(value)
      })
    })
  }

  async handlePublishClick (e) {
    const form = this.form
    const errorMsg = this.validateForm(form)

    // 表单验证
    if (errorMsg) {
      alert(errorMsg)
      return
    }

    // 设置日期和文章id
    await this.setState({
      commentsData: Object.assign({}, this.state.commentsData, {
        Article_id: this.props.Article_id,
        date: dateFormat(new Date(), 'yyyy-mm-dd HH:mm:ss')
      })
    })

    // 提交的数据
    const postData = {
      data: JSON.stringify(this.state.commentsData),
      sign: this.state.sign
    }

    // 发送请求
    const result = await postRequest(api.addCommentApi, postData)
    if (result.status === 'success') {
      alert('发布评论成功')
      form.reset()
    }
  }

  render () {
    const {comments} = this.props
    const {sign, commentsData} = this.state
    const {name, email, content, website, Article_id} = commentsData

    return (
      <div className="comment-container">
        <div className="comment-header-wrapper">
          <h3 className="comment-ti">文章评论</h3>
        </div>
        <div className="comment-wrapper">
          <form className="comment-box" ref={ele => this.form = ele}>
            <div className="comment-basic-info">
              <input className="info-input" value={name} onChange={this.handleOnChange} name="name" type="text" placeholder="昵称"/>
              <input className="info-input" value={email} onChange={this.handleOnChange} name="email" type="text" placeholder="邮箱"/>
              <input className="info-input" value={website} onChange={this.handleOnChange} name="website" type="text" placeholder="网址"/>
              <input className="info-input" value={Article_id} onChange={this.handleOnChange} name="Article_id" type="hidden"/>
              <input className="info-input" value={sign} onChange={this.handleOnChange} name="sign" type="hidden"/>
            </div>
            <div className="reply-area">
              <img src="/imgs/avatar.png" className="comment-avatar"/>
              <div className="textarea-wrapper">
                <textarea name="content" value={content} onChange={this.handleOnChange}></textarea>
              </div>
              <div className="reply-tool-bar">
                <button className="btn" type="button" onClick={this.handlePublishClick}>发布</button>
              </div>
            </div>
          </form>
          <div className="comment-detail">
            <p>文章评论 <span>{comments.length}</span> 条</p>
          </div>
          <ul className="comment-list">
            {
              comments.length > 0 ?
                comments.map((comment, i) => {
                  return (
                    <li className="list-item" key={i}>
                      <div className="list-inner">
                        <div className="comment-avatar">
                          <img src="/imgs/avatar.png"/>
                        </div>
                        <div className="comment-body">
                          <div className="comment-header">
                            <span className="comment-name">{comment.name}</span>
                          </div>
                          <p className="comment-content">{comment.content}</p>
                          <div className="comment-info">
                            <span className="comment-time">{dateFormat(comment.date, `yyyy 年 mm 月 dd 日 HH:mm`)}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                }) :
                <li>暂无评论</li>
            }

          </ul>
        </div>
      </div>
    )
  }
  componentDidMount () {
    this.props.get_all_comments()
  }
  componentWillUnmount () {
    this.form = null
  }
}

Comment.defaultProps = {
  comments: []
}

Comment.propTypes = {
  comments: PropTypes.array
}



function mapStateToProps (state) {
  return {
    comments: state.comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_comments: bindActionCreators(get_all_comments, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Comment)