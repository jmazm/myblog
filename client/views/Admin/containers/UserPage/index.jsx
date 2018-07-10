import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'
import PropsType from 'prop-types'

import AdminNav from '../../components/AdminNav'
import AdminHeader from '../../components/AdminHeader'



class UserPage extends Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate

    this.state = {
      provinceList: [],
      cityList: [],
      districtList: [],
      city: '',
      province: '',
      district: ''
    }
    
    this.selectHandler = this.selectHandler.bind(this)
  }

  static defaultProps = {

  }

  static propTypes = {

  }

  /**
   * 处理选项
   * @param e
   */
  async selectHandler (e) {
    const value = e.target.value
    const name = e.target.name
    let index = value.split('_')[1]
    const { provinceList, cityList, districtList } = this.state

    // 联动
    switch (name) {
      case 'province':
        // 每选择一次省份，则将城市和地区的数据清空
        await this.setState({
          cityList: [],
          districtList: [],
          city: '',
          district: ''
        })

        // 设置城市的数据和已选择的省份
        this.setState({
          cityList: this.filterData(provinceList, index),
          province: value
        })
        break
      case 'city':
        // 每选择一次城市，则将地区的数据清空
        await this.setState({
          districtList: [],
          district: ''
        })

        this.setState({
          districtList: this.filterData(cityList, index),
          city: value,
        })
        break
      case 'district':
        this.setState({
          district: value
        })
        break
    }
  }

  /**
   * 过滤数据
   * @param {array} list - 列表
   * @param {number} index - 索引
   * @return {Array.<T>|*}
   */
  filterData (list, index) {
    if (index == -1 ){
      return []
    }

    const chosen = list[index]
    const edges = chosen.edges

    return edges.filter((item) => {
      return item != null
    })
  }

  render () {
    const { provinceList, cityList, districtList } = this.state

    return (
      <div className="blog-management-wrapper blog--management">
        <AdminNav/>
        <div className="management-content-wrapper">
          <AdminHeader title="管理用户"/>
          <div className="content-inner">
            <form>
              <div>
                <span>地址：</span>
                <select onChange={ this.selectHandler } name="province">
                  <option value={`请选择省份_-1`}>请选择省份</option>
                  {
                    provinceList.map((item, i) => {
                      return <option key={i} value={ `${item.value}_${i}` }>{item.value}</option>
                    })
                  }
                </select>
                <select name="city" onChange={ this.selectHandler }>
                  <option value={`请选择城市_-1`}>请选择城市</option>
                  {
                    cityList.map((item, i) => {
                      return <option key={i} value={`${item.value}_${i}`}>{item.value}</option>
                    })
                  }
                </select>
                <select name="district" onChange={ this.selectHandler }>
                  <option value={`请选择地区_-1`}>请选择地区</option>
                  {
                    districtList.map((item, i) => {
                      return <option key={i} value={`${item.value}_${i}`}>{item.value}</option>
                    })
                  }
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  /**
   * jsonp
   * // ===
   * 1. 原理：通过 script 标签 不受同源策略的限制，可以通过script标签引入一个js或者是一个其他后缀形式（如php，jsp等）的文件，此文件返回一个js函数的调用
   * 2. 限制：只能是get请求，非敏感信息
   * 3. 具体实现：在全局挂一个全局函数jsonp，然后创建script节点，等内容获取到后会自动执行jsonp，然后将script节点和全局对象清除 （函数名可以自己定制）
   * === //
   */
  componentDidMount () {
    const script = document.createElement('script')
    script.src = 'https://file.jmazm.com/api/address'
    document.body.appendChild(script)

    script.onload = script.onreadystatechange = (e) => {
      if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
        document.body.removeChild(script)
      }
    }

    const self = this
    
    window.jsonp = (result) => {
      const data = result.data.edges
      const filterData = data.filter((item) => {
        return item != null
      })

      self.setState({
        provinceList: filterData
      })
    }
    
  }
  componentWillUnmount () {
    window.jsonp = null
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {

  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(UserPage)