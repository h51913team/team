import React, { Component } from 'react'
import {
    Form,
    Input,
    Select,
    TreeSelect
  } from 'antd';
  import CityData from './CityData'
  
  class CitiesForm extends Component  {
   render(){
    const { getFieldDecorator } = this.props.form; 
    return (
      <div>
        <Form
          labelCol={{ //控制表单格式
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal" >
          <Form.Item label="城市名称">
            {getFieldDecorator('name')(
          <TreeSelect
            treeData={CityData}
          />)}
        </Form.Item>
          <Form.Item label="车辆状态">
            {getFieldDecorator('carType')(
            <Select>
              <Select.Option value="运行中">运行中</Select.Option>
              <Select.Option value="停车点">停车点</Select.Option>
            </Select>)}
          </Form.Item>
          <Form.Item label="授权加盟商">
          {getFieldDecorator('shop')(
            <Input />)}
          </Form.Item>
          <Form.Item label="城市管理员">
          {getFieldDecorator('cityAdmin')(
            <Input />)}
          </Form.Item>
          <Form.Item label="运行状态">
          {getFieldDecorator('runType')(
            <Select>
              <Select.Option value="正常">正常</Select.Option>
              <Select.Option value="异常">异常</Select.Option>
            </Select>)}
          </Form.Item>
          <Form.Item label="操作人">
          {getFieldDecorator('person')(
            <Input/>)}
          </Form.Item>
        </Form>
      </div>
    )
        }
  };
  export default Form.create({})(CitiesForm);