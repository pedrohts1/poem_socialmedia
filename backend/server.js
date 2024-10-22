const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PoemRouter = require('./routes/PoemRouter')
const UserRouter = require('./routes/UserRouter')
require('dotenv').config()

const PORT = 8003

mongoose.connect(process.env.MONGO_STRING)
.then(()=>{console.log("Database Connected")})
.catch((err)=>{console.log("Database NOT Connected", err)})

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use('/', (req, res, next)=>{
    console.log(req.method, req.url, req.body)
    next()
})
app.use('/poems', PoemRouter)
app.use('/user', UserRouter)

app.listen(PORT,()=>{
    console.log('Server on Port: ', PORT)
})