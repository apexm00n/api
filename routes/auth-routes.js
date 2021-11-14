const express = require('express')
const {register, auth} = require('../controllers/auth-controllers')
const router = express.Router()

router.post("/reg", register)
router.post("/auth", auth)

module.exports = router