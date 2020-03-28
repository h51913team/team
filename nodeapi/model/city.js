// 城市相关的数据模型

const mongoose = require('mongoose')

let citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    carType: { type: String, required: true },
    shop: { type: String, required: true },
    cityAdmin: { type: String, required: true },
    runType: { type: String, required: true },
    person: { type: String, required: true },
})

let cityModel = mongoose.model('cities', citySchema)

module.exports = cityModel