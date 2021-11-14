const mongoose = require('mongoose')
const uuid = require('node-uuid')

const Schema = mongoose.Schema
const commnetSchema = new Schema ({
    _id: { type: String, default: function genUUID() { return uuid.v1()}},
    postId: {
        type: String,
        required: true,
      },
      parentId: {
        type: String
      },
      nickname: {
        type: String,
        required: true,
      },
      message:{
        type: String,
        required: true,
      },
      createDate: {
          type: Date,
          default: Date.now
      }
    }, {
        versionKey: false
    })



const Comment = mongoose.model('Comment', commnetSchema)
module.exports = Comment