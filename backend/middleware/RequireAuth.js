const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

async function requireAuth(req, res, next){
    const {user_token} = req.cookies
    if(!user_token){
        return res.status(401).json({error: "Authorization Token Required"})
    }
    
    try {
        const {_id, username} = jwt.verify(user_token, process.env.JWT_SECRET, {})

        req.user_id = await UserModel.findOne({_id}).select('_id')
        next()

    } catch (err) {
        return res.status(401).json({msg: "Authorization Denied", error: err})
    }
}

module.exports = {requireAuth}