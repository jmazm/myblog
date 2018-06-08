import React, {Component} from 'react'

import './style.css'

class AdminHeader extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
          <header className="admin-header">
              <h2>{this.props.title}</h2>
          </header>
        )
    }
}

module.exports = AdminHeader