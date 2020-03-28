// 员工相关的数据模型

const mongoose = require('mongoose')

let citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    sex: { type: String, required: true },
    like: { type: String, required: true },
    birthday: { type: String, required: true },
    marital: { type: String, required: true },
    address: { type: String, required: true },
})

let staffModel = mongoose.model('staff', citySchema)

module.exports = staffModel