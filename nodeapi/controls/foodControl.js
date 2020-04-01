// 将数据库相关的操作抽离处理
const CityModel = require('../model/city')
// 插入城市
let insertFood = async (obj) => {
  // 调用数据模型插入方法
  let result = await CityModel.insertMany(obj)
  return result
}
// 查询全部城市
let findFood = async () => {
  let result = await CityModel.find()
  return result
}
// 删除城市
let delFood = async (_id) => {
  // _id 就是要删除的菜品主键id
  let result = await CityModel.deleteOne({ _id })
  return result
}
// 修改城市数据
let updateFood = async (_id, updateInfo) => {
  // _id 要修改的主键id  updateInfo 修改的目标数据
  let result = await CityModel.updateOne({ _id }, updateInfo)
  return result
}
// 分页查询
let findFoodByPage = async (page, pageSize) => {
  let allFood = await CityModel.find()
  // 总数据条数
  let allCount = allFood.length
  // 每一页的数据
  let result = await CityModel.find().skip((Number(page) - 1) * pageSize).limit(Number(pageSize))
  return { result, allCount }
}
//  分类查询
let findFoodByType = async (foodType) => {
  let result = await CityModel.find({ foodType })
  return result
}
// 关键字查询
let findFoodByKw = async (kw) => {
  // 通过正则表达式匹配关键字
  let regex = new RegExp(kw)
  // 满足条件的所有数据
  let allFood = await CityModel.find({ $or: [{ name: { $regex: regex } }, { carType: { $regex: regex } },{ shop: { $regex: regex } },{ cityAdmin: { $regex: regex } },{ runType: { $regex: regex } },{ person: { $regex: regex } }] })
  // let allCount = allFood.length
  // 分页后满足关键字的数据
  // let result = await CityModel.find({ $or: [{ desc: { $regex: regex } }, { name: { $regex: regex } }] })
  //   .skip(Number((page - 1) * pageSize)).limit(Number(pageSize))
  // return { result, allCount }
  return allFood
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