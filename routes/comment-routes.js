 const express = require('express')
 const{addComment,
       deleteComment,
       getComment} = require('../controllers/comment-controllers')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', addComment)
router.delete('/:id',auth, deleteComment)
router.get('/', getComment)

module.exports = router