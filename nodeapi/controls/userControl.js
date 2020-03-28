const UserModel = require("../model/user")
const { createToken } = require('../utils/jwt')
let userReg = async (name, pass) => {
  //  1. 名称是否重复
  let isExst = await UserModel.findOne({ name })
  let result
  // 如果查询到数据 返回查到的数据 没有返回假 
  if (isExst) {
    throw '名称已注册'
  } else {
    result = await UserModel.insertMany({ name, pass })
  }
  //  2. 插入数据库
  return result
}

// 用户登录
let userLogin = async (name, pass) => {
  console.log(name, pass);
  let result = await UserModel.findOne({ name })
  console.log(result);

  if (result) {
    //  登录成功 产生新的token
    let { _id, name } = result
    let token = createToken({ _id, name })
    //将token更新数据库
    let updateResult = await UserModel.updateOne({ _id }, { token })
    // 错误处理判断
    console.log(updateResult)
    return { _id, name, token }
  } else {
    throw '用户名或密码不存在'
  }
}
//  判断token 和用户是否统一 
let tokenCheck = async (_id, token) => {
  let result = await UserModel.findOne({ _id, token })
  if (result) {
    return result
  } else {
    throw '用户token不匹配'
  }
}
module.exports = {
  userReg,
  userLogin,
  tokenCheck,
}