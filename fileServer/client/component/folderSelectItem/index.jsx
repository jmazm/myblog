import React, {Component} from 'react'

import './style.css'

class FolderSelectItem extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        const {idFolder, FolderName} = this.props
        return (
          <option className="select-item" value={idFolder}>{FolderName}</option>
        )
    }
}

module.exports = FolderSelectItem
