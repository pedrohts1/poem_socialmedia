const mongoose = require('mongoose')
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')

function createToken(_id, username){
    return jwt.sign({_id: _id, username: username}, process.env.JWT_SECRET, {})
}

async function login(req, res) {
    const {user_login, password} = req.body

    try{
        const user = await UserModel.loginUser(user_login, password)

        const jwt_token = createToken(user._id, user.username)
        res.cookie('user_token', jwt_token).status(200).json(user)
    }catch (err) {
        return res.json({error: err.message})
    }

}

async function register(req, res) {
    const {username, email, password} = req.body

    try {
        const user = await UserModel.registerUser(username, email, password)

        return res.status(200).json(user)
    } catch (err) {
        return res.json({error: err.message})
    }
}

async function updateUser(req, res){

}

async function deleteUser(req, res){
    
}

function getProfile(req, res){
    try {
        const {user_token} = req.cookies
        if(user_token){
            jwt.verify(user_token, process.env.JWT_SECRET, {}, (err, user_data)=>{
                if(err) throw err
                res.status(200).json(user_data)
            })
        }else{
            res.json(null)
        }
    } catch (err) {
        res.json({error: err.message})
    }
    

}

module.exports = {login, register, getProfile}