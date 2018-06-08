import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header'

class Message extends Component {
    constructor (props) {
        super(props)

      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
    }
    render () {
        return (
          <div className="main">
              <div>留言</div>
          </div>
        )
    }
}

module.exports = Message