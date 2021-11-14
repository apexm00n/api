const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    nickname : {type: String, required: true},
    password : {type: String, required: true},
    token : {type: String}
}, {
    versionKey: false
})

module.exports = mongoose.model("User", userschema)