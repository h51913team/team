const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const morgan = require('morgan');
//启动服务器的时候同时启动数据库
const db = require('./db/connect')


//post 数据的解析 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//路由
//基础路由
app.get('/', function (req, res) {
    res.send("这里是nodejs+mongodb编写restfulAPI的笔记！");
})

let setupRoute = require('./routes/setup');// 导入路由文件
let cityRouter = require('./routes/city')
let staffRouter = require('./routes/person')
let orderRouter = require('./routes/order')
app.use('/city', cityRouter);   //设置访问路径
app.use('/admin', setupRoute);   //设置访问路径
app.use('/staff', staffRouter);   //设置访问路径
app.use('/order', orderRouter);   //设置访问路径
// 启动服务
app.listen(3000, () => {
    console.log(`/**
    *　　　　　　　 ┏┓　 ┏┓+ +
    *　　　　　　　┏┛┻━━━┛┻┓ + +
    *　　　　　　　┃　　　　　　┃ 　
    *　　　　　　　┃　　　━　　 ┃ ++ + + +
    *　　　　　　 ████━████  ┃+
    *　　　　　　　┃　　　　　　　┃ +
    *　　　　　　　┃　　　┻　　　┃
    *　　　　　　　┃　　　　　　┃ + +
    *　　　　　　　┗━┓　　　┏━┛
    *　　　　　　　　 ┃　　　┃　　　　　　　　　　　
    *　　　　　　　　 ┃　　　┃ + + + +
    *　　　　　　　　 ┃　　　┃　　　　Code is far away from bug with the animal protecting　　　　　　　
    *　　　　　　　　 ┃　　　┃ + 　　　　神兽保佑,代码无bug　　
    *　　　　　　　　 ┃　　　┃
    *　　　　　　　　 ┃　　　┃　　+　　　　　　　　　
    *　　　　　　　　 ┃　 　 ┗━━━┓ + +
    *　　　　　　　　 ┃ 　　　　   ┣┓
    *　　　　　　　　 ┃ 　　　　　 ┏┛
    *　　　　　　　　 ┗┓┓┏━┳┓┏┛ + + + +
    *　　　　　　　　  ┃┫┫ ┃┫┫
    *　　　　　　　　  ┗┻┛ ┗┻┛+ + + +
    */`)
});
