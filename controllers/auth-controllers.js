const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const register = async (req, res) => {
    const {nickname, password} = req.body
    console.log(nickname, password)
    if(nickname && password){
    const candidate = await User.findOne({nickname: nickname})
    if (candidate){
        res.status(409).send("That nickname already taken")
    } else {
        const salt = bcrypt.genSaltSync(10)
        const user = new User({
            nickname: nickname,
            password: bcrypt.hashSync(password, salt)
        })
        const token = jwt.sign(
            {nickname: nickname, userId: user._id},
            "secure",
            {
              expiresIn: "2h",
            }
          )
        user.token = token
        await user.save()
        res.status(201).json(token)}
    } else {
        res.status(500).send("Invalid data")
    }
}

const auth = async (req, res) => {
    const {nickname, password} = req.body
    console.log(nickname, password)
    const candidate = await User.findOne({nickname: nickname})
    if(candidate){
        const passwordresult = bcrypt.compareSync(password, candidate.password)
        if (passwordresult){
            const token = await jwt.sign({
                nickname: candidate.nickname,
                userId: candidate._id
                },
                "secure",
                {expiresIn: "2h"})
            let user = await User.findOneAndUpdate({nickname: nickname}, {token: token}, {returnOriginal: false})
            user.save()
            res.status(200).json(token)
        } else {res.status(401).send("Invalid password")}
    } else {res.status(400).send("User not found")}
}

module.exports = {register, auth}