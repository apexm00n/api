const Comment = require('../models/Comment')

const addComment = (req, res) => {
    const {postId, parentId, nickname, message} = req.body
    if (parentId, postId, nickname, message) {
        const comment = new Comment({postId, parentId, nickname, message})
        comment
        .save()
        .then((comment) => {res.json(comment.id)})
        .catch((err) => {res.status(500).send(err.massage)})
    } else {
        res.status(500).send("Invalid data")
    }
}


const deleteComment = (req, res) => {
    Comment.findByIdAndDelete(req.params["id"], function(err, user) {
        err ? res.status(400).send("Invalid comment id") : res.send(`Comment ${req.params.id} successfuly deleted`)
    })
}


const getComment = (req, res) => {
    const postId = req.query.postId
    Comment
    .find({postId: postId})
    .then((comment) => {res.json(comment)})
    .catch((err) => {res.status(400)})
}

module.exports = {addComment, deleteComment, getComment}