import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import  style from './index.module.less'

class User extends Component {
    onFinish=(valus)=>{
        console.log(valus)
    }
    render() {
        return (
            <div className={style.box}>
                <h1 className={style.login}>登录</h1>
                 <Form
                name="normal_login"
                className={style["login-form"]}
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true,  message: '姓名不能为空！' },
                    {min:3,message:'用户名长度大于3位'},
                    {max:9,message:'用户名长度小于9位'} ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" style={{height:"40px"}} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true,message: '密码不能为空！'},
                    {min:3,message:'密码长度大于3位'},
                    {max:15,message:'密码长度小于15位'}]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    style={{height:"40px"}}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>七天免登录</Checkbox>
                    </Form.Item>
                    <span className={style["login-form-forgot"]} >
                   忘记密码？
                    </span>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={style["login-form-button"]}>
                    登录
                    </Button>
                </Form.Item>
                </Form>
            </div>
        );
    }
}

export default User;