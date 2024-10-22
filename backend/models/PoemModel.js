const mongoose = require('mongoose')

const PoemSchema = mongoose.Schema({
    title: {
        type: String,
        length: 10,
        maxlength: 50
    },
    author: {
        type: String,
        maxlength: 50,
        required: true
    },
    text: {
        type: String,
        minlength: 1,
        maxlength: 5000,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})



const PoemModel = mongoose.model('Poem', PoemSchema)

module.exports = PoemModel