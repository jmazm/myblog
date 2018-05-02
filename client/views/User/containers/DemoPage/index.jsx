import React, {Component} from 'react'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import AboutMe from '../../components/AboutMe'
import TagList from '../../components/TagList'

class Demo extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
          <div className="my-blog">
              <Header/>
              <SearchBar/>
              <div className="main">
                  <div className="side-bar">
                      <AboutMe/>
                      <TagList/>
                  </div>
              </div>
          </div>
        )
    }
}

module.exports = Demo