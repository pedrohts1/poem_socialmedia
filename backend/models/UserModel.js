const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.statics.registerUser = async (username, email, password) => {
    if(!username || !email || !password){
        throw new Error("All fields must be filled")
    }
    if(username.match(/^\d/) || username.length <=3 || username.length >= 33){
        throw new Error("O nome de usuario não pode começar com números, deve ter entre 4 e 32 caracteres")
    }
    if(!validator.isEmail(email)){
        throw new Error("Not a valid email")
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password not strong enough")
    }

    const email_exists = await UserModel.findOne({email})
    if(email_exists){
        throw new Error("Email in use")
    }
    const username_exists = await UserModel.findOne({username})
    if(username_exists){
        throw new Error("Username in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hashed_pass = await bcrypt.hash(password, salt)
    
    const user = await UserModel.create({username, email, password: hashed_pass})

    return user
}

UserSchema.statics.loginUser = async (user_login, password) => {
    if(!user_login || !password){
        throw new Error("All fields must be filled")
    }

    const is_email = validator.isEmail(user_login)

    const user = await UserModel.findOne(is_email ? {email: user_login} : {username: user_login})
    if(!user){
        throw new Error("No Account found")
    }

    const password_match = await bcrypt.compare(password, user.password)
    if(!password_match){
        throw new Error("Wrong Password")
    }

    return user
}

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel