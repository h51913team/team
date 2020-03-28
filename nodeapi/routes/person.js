const express = require('express')
const router = express.Router()
const {
    insertFood,
    findFood,
    delFood,
    updateFood,
    findFoodByPage } = require('../controls/staffControl')
/**
 * @api {post} /staff/add  添加员工
 * @apiName add
 * @apiGroup Staff
 *
 * @apiParam {String} sex  员工性别
 * @apiParam {String} name 员工名字.
 * @apiParam {String} like 员工爱好.
 * @apiParam {String} birthday 员工生日.
 * @apiParam {String} marital 员工婚姻.
 * @apiParam {Number} address  员工住址.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/add', (req, res) => {
    // 接受数据
    let { name, sex, like, birthday, marital, address } = req.body
    console.log({ name, sex, like, birthday, marital, address });

    // 处理数据 插入数据库person
    insertFood({ name, sex, like, birthday, marital, address })
        .then(() => { res.send({ err: 0, msg: '插入成功' }) })
        .catch((err) => {
            res.send({ err: -1, msg: '插入失败请重试' })
        })
    // 返回数据
})
/**
 * @api {post} /staff/getInfo  查询全部
 * @apiName getInfo
 * @apiGroup Staff
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
 * @api {post} /staff/del  城市删除
 * @apiName del
 * @apiGroup Staff
 *
 * @apiParam   {String} name 员工名字
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
 * @api {post} /staff/update   修改
 * @apiName update
 * @apiGroup Staff
 *
* @apiParam {String} sex  员工性别
 * @apiParam {String} name 员工名字.
 * @apiParam {String} like 员工爱好.
 * @apiParam {String} birthday 员工生日.
 * @apiParam {String} marital 员工婚姻.
 * @apiParam {Number} address  员工住址.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */

router.post('/update', (req, res) => {
    // 获取修改数据的参数
    let { name, sex, like, birthday, marital, address } = req.body
    console.log({ name, sex, like, birthday, marital, address })
    updateFood(name, { name, sex, like, birthday, marital, address })
        .then(() => { res.send({ err: 0, msg: '修改成功' }) })
        .catch((err) => { res.send({ err: -1, msg: '修改失败请重试' }) })
})
/**
 * @api {post} /staff/getInfos   分页查询
 * @apiName getInfos
 * @apiGroup Staff
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