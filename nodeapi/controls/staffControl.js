// 将数据库相关的操作抽离处理
const staffModel = require('../model/person')
// 插入员工
let insertFood = async (obj) => {
  // 调用数据模型插入方法
  let result = await staffModel.insertMany(obj)
  return result
}
// 查询全部员工
let findFood = async () => {
  let result = await staffModel.find()
  return result
}
// 删除员工
let delFood = async (_id) => {
  // _id 就是要删除的菜品主键id
  let result = await staffModel.deleteOne({ name: _id })
  return result
}
// 修改员工数据
let updateFood = async (_id, updateInfo) => {
  // _id 要修改的主键id  updateInfo 修改的目标数据
  let result = await staffModel.update({ "name": _id }, updateInfo)
  return result
}
// 分页查询
let findFoodByPage = async (page, pageSize) => {
  let allFood = await staffModel.find()
  // 总数据条数
  let allCount = allFood.length
  // 每一页的数据
  let result = await staffModel.find().skip((Number(page) - 1) * pageSize).limit(Number(pageSize))
  return { result, allCount }
}
//  分类查询
let findFoodByType = async (foodType) => {
  let result = await staffModel.find({ foodType })
  return result
}
// 关键字查询
let findFoodByKw = async (kw, page, pageSize) => {
  // 通过正则表达式匹配关键字
  let regex = new RegExp(kw)
  // 满足条件的所有数据
  let allFood = await staffModel.find({ $or: [{ desc: { $regex: regex } }, { name: { $regex: regex } }] })
  let allCount = allFood.length
  // 分页后满足关键字的数据
  let result = await staffModel.find({ $or: [{ desc: { $regex: regex } }, { name: { $regex: regex } }] })
    .skip(Number((page - 1) * pageSize)).limit(Number(pageSize))
  return { result, allCount }
}
module.exports = {
  findFoodByKw,
  findFoodByType,
  findFoodByPage,
  insertFood,
  findFood,
  delFood,
  updateFood
}