import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'

class Demo extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
  }
  render () {
    return (
      <div className="container my--blog">
        <Header/>
        <div className="main">
          {/*<SearchBar/>*/}
          <div className="main-inner">
            <h2>demo</h2>
            <div className="pagination-wrapper">
              {/*<Pagination onChange={this.pageOnChange.bind(this)} defaultCurrent={1} total={parseInt(total)} defaultPageSize={5}/>*/}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Demo