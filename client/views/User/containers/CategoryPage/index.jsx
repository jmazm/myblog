import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'
import TagList from '../../components/TagList'
import {actions as CategoryReducer} from '../../../../redux/reducer/categoryReducer'

const {get_all_categories} = CategoryReducer

class Category extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
  }
  render () {
    const {categories} = this.props

    return (
      <div className="container my--blog">
        <Header/>
        <div className="main">
          <div className="main-inner">
            <div className="widget-wrapper">
              <h2 className="widget-title"><i className="fa fa-bookmark"></i>类别展示</h2>
              <TagList data={categories} type="category"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    this.props.get_all_categories()
  }
}

// 设置默认值
Category.defaultProps = {
  categories: []
}

Category.propTypes = {
  categories: PropTypes.array
}

function mapStateToProps (state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_categories: bindActionCreators(get_all_categories, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Category)