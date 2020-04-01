const express = require('express')
const router = express.Router()
const {
    insertFood,
    findFood,
    delFood,
    updateFood,
    findFoodByPage,
    findFoodByKw } = require('../controls/foodControl')
/**
 * @api {post} /city/add   添加城市
 * @apiName add
 * @apiGroup City
 *
 * @apiParam {String} carType  车辆状态
 * @apiParam {String} name 城市名字.
 * @apiParam {String} shop 运营城市.
 * @apiParam {String} cityAdmin 城市管理员.
 * @apiParam {String} runType 运行状态.
 * @apiParam {Number} person  负责人.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/add', (req, res) => {
    // 接受数据
    let { name, carType, shop, cityAdmin, runType, person } = req.body
    console.log({ name, carType, shop, cityAdmin, runType, person });

    // 处理数据 插入数据库person
    insertFood({ name, carType, shop, cityAdmin, runType, person })
        .then(() => { res.send({ err: 0, msg: '插入成功' }) })
        .catch((err) => {
            res.send({ err: -1, msg: '插入失败请重试' })
        })
    // 返回数据
})
/**
 * @api {post} /city/getInfo  查询全部
 * @apiName getInfo
 * @apiGroup City
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
 * @api {post} /city/del  城市删除
 * @apiName del
 * @apiGroup City
 *
 * @apiParam   {String} name 城市名字
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 * @apiSuccess {Array} list  查询到的数据.
 */
// 2. 删除菜品
router.post('/del', (req, res) => {
    // 获取要删除数据的id
    let { _id } = req.body
    console.log(_id);
    
    delFood(_id)
        .then(() => { res.send({err: 0, msg: '删除成功' }) })
        .catch(() => { res.send({err: -1, msg: '删除失败请重试' }) })
})

/**
 * @api {post} /city/update   修改
 * @apiName update
 * @apiGroup City
 *
 * @apiParam {String} carType  车辆状态
 * @apiParam {String} name 城市名字.
 * @apiParam {String} shop 运营城市.
 * @apiParam {String} cityAdmin 城市管理员.
 * @apiParam {String} runType 运行状态.
 * @apiParam {Number} person  负责人.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */

router.post('/update', (req, res) => {
    // 获取修改数据的参数
    let { _id,name, carType, shop, cityAdmin, runType, person } = req.body

    updateFood(_id, { name, carType, shop, cityAdmin, runType, person })
        .then(() => { res.send({ err: 0, msg: '修改成功' }) })
        .catch((err) => { res.send({ err: -1, msg: '修改失败请重试' }) })
})
/**
 * @api {post} /city/getInfos   分页查询
 * @apiName getInfos
 * @apiGroup City
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
/**
 * @api {post} /admin/food/getInfosByKw   关键字查询
 * @apiName getInfosByKw
 * @apiGroup Food
 *
 * @apiParam {String} kw 关键字 
 * @apiParam {String} page 页码数 
 * @apiParam {String} pageSize 每页条数.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/getInfosByKw',(req,res)=>{
    let kw = req.body.kw ||''
    // let page = req.body.page||1
    // let pageSize = req.body.pageSize||2
    findFoodByKw(kw)
    .then((data)=>{
        console.log(data);
      res.send({err:0,msg:'查询成功',list:data})
    })
    .catch((err)=>{res.send({err:-1,msg:'查询失败请重试'})})
  })
module.exports = router