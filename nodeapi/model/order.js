// 员工相关的数据模型

const mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true },
    carNumber: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    mileage: { type: String, required: true },
    Duration: { type: String, required: true },
    state: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    amount: { type: String, required: true },
    pay: { type: String, required: true },
})

let orderModel = mongoose.model('order', orderSchema)

module.exports = orderModel