const express = require('express')
const {
    getPage,
    searchPosts,
    addPost,
    getPost,
    deletePost,
    editPost,
} = require('../controllers/post-controllers')
const auth = require('../middleware/auth')

const router = express.Router()

router.get("/search", searchPosts)
router.get('/:id', getPost)
router.get('/', getPage)
router.post('/', auth,  addPost)
router.delete('/:id', auth, deletePost)
router.put('/:id', auth,  editPost)

module.exports = router