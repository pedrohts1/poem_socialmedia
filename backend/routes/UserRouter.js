const express = require('express')
const cors = require('cors')
const {login, register, getProfile} = require('../controllers/UserController')

const router = express.Router()

router.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

router.get('/profile', getProfile)
router.post('/login', login)
router.post('/register', register)

module.exports = router