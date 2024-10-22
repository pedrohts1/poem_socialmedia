const mongoose = require('mongoose')
const PoemModel = require('../models/PoemModel')

async function getAllPoems(req, res){
    const user_id = req.user_id
    const poems = await PoemModel.find({user_id}).sort({createdAt: -1})

    if(!poems){
        return res.status(404).json({msg: "No poem found"})
    }

    return res.status(200).json(poems)
}
async function getPoem(req, res){
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({error: "Invalid ID"})
    }

    const poem = await PoemModel.findById(id)

    if(!poem){
        return res.status(404).json({msg: "No Poem with given ID"})
    }

    return res.status(200).json(poem)

}
async function createPoem(req, res){
    const {title, author, text} = req.body
    const user_id = req.user_id

    try {
        const poem = await PoemModel.create({
            title,
            author,
            text,
            user_id
        })
        return res.status(200).json(poem)
    } catch (err) {
        return res.json({error: err})
    }

}

async function updatePoem(req, res){
    const id = req.params.id
    const {title, author, text} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({error: "Invalid ID"})
    }

    const poem = await PoemModel.findOneAndUpdate({_id: id}, {
        title,
        author,
        text
    }, {returnDocument: "after"})

    if(!poem){
        return res.status(404).json({msg: "No Poem with given ID"})
    }

    return res.status(200).json(poem)
}

async function deletePoem(req, res){
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({error: "Invalid ID"})
    }

    const poem = await PoemModel.findOneAndDelete({_id: id})

    if(!poem){
        return res.status(404).json({msg: "No Poem with given ID"})
    }

    return res.status(200).json(poem)
}

module.exports = 
{getAllPoems, getPoem, createPoem, updatePoem, deletePoem}