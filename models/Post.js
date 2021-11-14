const mongoose = require('mongoose')
const uuid = require('node-uuid')


const Schema = mongoose.Schema
const postSchema = new Schema ({
    _id: { type: String, default: function genUUID() { return uuid.v1()}},
    title: {
        type: String,
        required: true,
      },
      preview: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      }, 
      publishDate: {
          type: Date,
          default: Date.now
      }
    }, {
        versionKey: false
    })



const Post = mongoose.model('Post', postSchema)
module.exports = Post