import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'
import TagList from '../../components/TagList'

import { actions as TagReducer} from '../../../../redux/reducer/tagReducer'

const { get_all_tags } = TagReducer

class Tag extends Component {
  constructor (props) {
    super(props)
    
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
    
    this.state = {
      currentPage: 1
    }
  }
  render () {
    const {tags} = this.props

    return (
      <div className="container my--blog">
        <Header/>
        <div className="main">
          <div className="main-inner">
            <div className="widget-wrapper">
              <h2 className="widget-title"><i className="icon-tags"></i>标签展示</h2>
              <TagList data={tags} type="tag"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    this.props.get_all_tags()
  }
}

// 设置默认值
Tag.defaultProps = {
  tags: []
}

Tag.propTypes = {
  tags: PropTypes.array
}

function mapStateToProps (state) {
  return {
    tags: state.tags
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_tags: bindActionCreators(get_all_tags, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Tag)