const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },

})

const Customer = mongoose.model('Customer', userSchema)
module.exports = Customer