const express = require('express')
const router = express.Router()
const {
    insertFood,
    findFood,
    delFood,
    updateFood,
    findFoodByPage } = require('../controls/orderControl')
/**
 * @api {post} /order/add   添加订单
 * @apiName add
 * @apiGroup Order
 *
 * @apiParam {String} orderNumber  订单编号
 * @apiParam {String} carNumber 车辆编号.
 * @apiParam {String} name 用户名.
 * @apiParam {String} phoneNumber 手机号.
 * @apiParam {String} mileage 里程.
 * @apiParam {String} Duration  行驶时长.
 * @apiParam {String} state  状态.
 * @apiParam {String} startTime  开始时间.
 * @apiParam {String} endTime  结束时间.
 * @apiParam {String} amount  订单金额.
 * @apiParam {String} pay  实付金额.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/add', (req, res) => {
    // 接受数据
    let { orderNumber, carNumber, name, phoneNumber, mileage, Duration, state, startTime, endTime, amount, pay } = req.body
    console.log({ orderNumber, carNumber, name, phoneNumber, mileage, Duration, state, startTime, endTime, amount, pay });

    // 处理数据 插入数据库person
    insertFood({ orderNumber, carNumber, name, phoneNumber, mileage, Duration, state, startTime, endTime, amount, pay })
        .then(() => { res.send({ err: 0, msg: '插入成功' }) })
        .catch((err) => {
            res.send({ err: -1, msg: '插入失败请重试' })
        })
    // 返回数据
})
/**
 * @api {post} /order/getInfo  查询全部
 * @apiName getInfo
 * @apiGroup Order
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 * @apiSuccess {Array} list  查询到的数据.
 */
router.post('/getInfo', (req, res) => {
    findFood()
        .then((infos) => { res.send({ list: infos, err: 0, msg: '查询成功' }) })
        .catch((err) => { res.send({ err: -1, msg: '查询失败请重试' }) })
})
/**
 * @api {post} /order/del  城市删除
 * @apiName del
 * @apiGroup Order
 *
 * @apiParam   {String} name 用户名
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 * @apiSuccess {Array} list  查询到的数据.
 */
// 2. 删除员工
router.post('/del', (req, res) => {
    // 获取要删除数据的id
    let { name } = req.body
    delFood(name)
        .then(() => { res.send({ err: 0, msg: '删除成功' }) })
        .catch((err) => { res.send({ err: -1, msg: '删除失败请重试' }) })

})

/**
 * @api {post} /order/update   修改
 * @apiName update
 * @apiGroup Order
 *
 * @apiParam {String} orderNumber  订单编号
 * @apiParam {String} carNumber 车辆编号.
 * @apiParam {String} name 用户名.
 * @apiParam {String} phoneNumber 手机号.
 * @apiParam {String} mileage 里程.
 * @apiParam {String} Duration  行驶时长.
 * @apiParam {String} state  状态.
 * @apiParam {String} startTime  开始时间.
 * @apiParam {String} endTime  结束时间.
 * @apiParam {String} amount  订单金额.
 * @apiParam {String} pay  实付金额.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */

router.post('/update', (req, res) => {
    // 获取修改数据的参数
    let { orderNumber, carNumber, name, phoneNumber, mileage, Duration, state, startTime, endTime, amount, pay } = req.body
    console.log({ orderNumber, carNumber, name, phoneNumber, mileage, Duration, state, startTime, endTime, amount, pay })
    updateFood(name, { orderNumber, carNumber, name, phoneNumber, mileage, Duration, state, startTime, endTime, amount, pay })
        .then(() => { res.send({ err: 0, msg: '修改成功' }) })
        .catch((err) => { res.send({ err: -1, msg: '修改失败请重试' }) })
})
/**
 * @api {post} /order/getInfos   分页查询
 * @apiName getInfos
 * @apiGroup Order
 *
 * @apiParam {String} page 查询页码数.
 * @apiParam {String} pageSize 每页的数据条数.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/getInfos', (req, res) => {
    let page = req.body.page || 1 //查询的第几页数据
    let pageSize = req.body.pageSize || 2 //每页几条数据
    findFoodByPage(page, pageSize)
        .then((data) => {
            console.log(data)
            let { result, allCount } = data
            res.send({ err: 0, msg: '查询成功', list: result, allCount })
        })
        .catch((err) => { res.send({ err: -1, msg: '查询失败请重试' }) })
})

module.exports = router