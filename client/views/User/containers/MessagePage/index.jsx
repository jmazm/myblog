import React, {Component} from 'react'
import Header from '../../components/Header'

class Message extends Component {
    constructor (props) {
        super(props)
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