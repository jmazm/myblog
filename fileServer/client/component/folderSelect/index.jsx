import React, {Component} from 'react'

import FolderSelectItem from '../folderSelectItem'

import './style.css'

class FolderSelect extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        const {data} = this.props

        return (
          <select className="select" onChange={this.props.onChange.bind(this)}>
            {
              data.length > 0 ?
                data.map((item, i) => {
                  return <FolderSelectItem idFolder={item.idFolder} FolderName={item.FolderName} key={i}/>
                }) :
                <FolderSelectItem idFolder={-1} FolderName={'暂无数据'}/>
            }
          </select>
        )
    }
    componentWillMount () {
    }
}

module.exports = FolderSelect
