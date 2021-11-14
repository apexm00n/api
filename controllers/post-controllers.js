const Post = require('../models/post')


const getPage = (req, res) =>{
    const page = parseInt(req.query.page)
    const count = parseInt(req.query.count)
    Post
    .find()
    .sort({publishDate: -1})
    .skip((page - 1) * count)
    .limit(count)
    .then((posts) => {res.json(posts)})
    .catch((err) =>{res.status(400).send(err)})
}


const searchPosts = (req, res) => {
    const text = req.query.searchData
    Post
      .find({
        $or: [
          { title: { $regex: text}},
          { body: { $regex: text}}
        ]
      })
      .then((posts) => res.status(200).json(posts))
      .catch((error) => res.status(400).json(error))
  }


const getPost = (req, res) => {
    Post.findOne({_id : req.params["id"]}, function(err, user) {
        if(!user){
        res.status(404).send("Id not found")
    }
        else {res.send(user)}
    })
}


const addPost = (req, res) => {
    const {title, preview, body} = req.body
    const post = new Post({title, preview, body})
    post
    .save()
    .then((post) => {res.json(post.id)})
    .catch((err) => {res.status(500).send(err.massage)})
}


const deletePost = (req, res) => {
    Post.findByIdAndDelete(req.params["id"], function(err, user) {
        err ? res.status(400).send("Invalid post id") : res.send(`Post ${req.params.id} successfuly deleted`)
    })
}


const editPost = (req, res) => {
    if(!req.body) return res.sendStatus(400)
    const id = req.params["id"]
    const {title, preview, body} = req.body
    Post
    .findByIdAndUpdate(id, { title, preview, body}, { new: true })
    .then((post) => {res.json(post)})
    .catch((err) => {res.status(500).send(err)})
}


module.exports = {
    getPage,
    searchPosts,
    addPost,
    getPost,
    deletePost,
    editPost,
}