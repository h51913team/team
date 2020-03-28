import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Menu} from 'antd'
import {
    UserOutlined,
    HomeOutlined,
    RestOutlined,
    DollarCircleOutlined,
    SettingOutlined,
    SmileOutlined
  } from '@ant-design/icons';
  import menulist from './menuList'
const { SubMenu } = Menu

 class SliderNav extends Component {
    jumpPath=(e)=>{
        let {path}=e.item.props
        this.props.history.replace(path)
    }
    renderListItem(data){
       return data.map((item)=>{
           if(item.children){
            return(
                <SubMenu
                key={item.key}
                title={ <span>{this.renderIocn(item.icon)}{item.title}</span> }
              >
                  {this.renderListItem(item.children)}
              </SubMenu> 
            )
           }else{
                return (
                    <Menu.Item key={item.key} path={item.path}>
                        {this.renderIocn(item.icon)}
                        <span>{item.title}</span>
                    </Menu.Item>
                )
           }
        })
    }
    renderIocn(icon){
        switch (icon) {
            case "home":
                return <HomeOutlined />
            case "city":
                return <RestOutlined />
            case "order":
                return <DollarCircleOutlined />
            case "user":
                return <UserOutlined />
            case "setting":
                return <SettingOutlined />
            default:
                return <SmileOutlined/>
        }
    }

    render() {
        return (
            <Menu theme="dark" 
            defaultSelectedKeys={['1']} 
            mode="inline"
            onClick={this.jumpPath}
            >
            {this.renderListItem(menulist)} 
              </Menu> 
        )
    }
}
export default withRouter(SliderNav) 