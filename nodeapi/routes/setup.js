var express = require("express");
const { userReg, userLogin } = require("../controls/userControl")

var router = express.Router();
/**
* @api {post} /admin/reg  注册
* @apiName reg
* @apiGroup User
*
* @apiParam {String} name  注册名字.
* @apiParam {String} pass  注册密码.
*
* @apiSuccess {String} err 状态码r.
* @apiSuccess {String} msg  信息提示.
*/
// 注册管理员
router.post('/reg', (req, res) => {
    let { name, pass } = req.body
    console.log({ name, pass })
    userReg(name, pass)
        .then(() => { res.send({ err: 0, msg: '注册ok' }) })
        .catch((err) => { res.send({ err: -2, msg: err }) })
})
/**
* @api {post} /admin/login  邮箱登录
* @apiName login
* @apiGroup User
*
* @apiParam {String} name  登录名字.
* @apiParam {String} pass  登录密码.
*
* @apiSuccess {String} err 状态码r.
* @apiSuccess {String} msg  信息提示.
*/
//登录
router.post('/login', (req, res) => {
    let { name, pass } = req.body
    console.log(name, pass);

    userLogin(name, pass)
        .then((info) => {
            // // 登录成功之后产生token 并返回
            res.send({ err: 0, msg: '登录成功', userInfo: info })
        })
        .catch((err) => { res.send({ err: -1, msg: err }) })
})
module.exports = router; //导出路由