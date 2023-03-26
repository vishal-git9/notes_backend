const express = require("express")
const notesModel = require("../Models/note.model")
const notesRouter =  express.Router()
const jwt = require("jsonwebtoken")



notesRouter.get("/",async(req,res)=>{
    const token  = req.headers.authorization
    const {userId} = jwt.verify(token,"user")
    try {
        if(userId){
            const notesData = await notesModel.find({userId})
            res.status(200).send({msg:"all notes",data:notesData})
        }
    } catch (error) {
        res.status(400).send({msg:"error while fetching the notes data",error})
    }
})
notesRouter.get("/:id",async(req,res)=>{
    const token  = req.headers.authorization
    const {id} = req.params
    const {userId} = jwt.verify(token,"user")
    const notesData = await notesModel.findOne({_id:id})
    const userId_in_note = notesData.userId
    try {
        if(userId===userId_in_note){
            res.status(200).send({msg:"all notes",data:notesData})
        }
    } catch (error) {
        res.status(400).send({msg:"error while fetching the notes data",error})
    }
})

notesRouter.post("/addnotes",async(req,res)=>{
    try {
        const notesData = await new notesModel(req.body)
        await notesData.save()
        res.status(200).send({msg:"note posted successfully"})
    } catch (error) {
        res.status(400).send({msg:"note posted successfully",error})
    }
})
notesRouter.patch("/updatenote/:note_id",async(req,res)=>{
    const token  = req.headers.authorization
    // getting the id
    const {userId} = jwt.verify(token,"user")
    const {note_id} = req.params
    // finding the note
    const noteData = await notesModel.findOne({_id:note_id})
    const noteData_id = noteData.userId
    console.log(userId)
    console.log(noteData_id)
    try {
        if(noteData_id===userId){
            console.log("hi")
            await notesModel.findByIdAndUpdate(note_id,req.body)
            res.status(200).send({msg:"note updated successfully"})    
        }
    } catch (error) {
        res.status(400).send({msg:"note can't be updated",error})
    }
})
notesRouter.delete("/deletenote/:note_id",async(req,res)=>{
    const token  = req.headers.authorization
    // getting the id
    const {userId} = jwt.verify(token,"user")
    const {note_id} = req.params
    // finding the note
    const noteData = await notesModel.findOne({_id:note_id})
    const noteData_id = noteData.userId
    try {
        if(noteData_id===userId){
            await notesModel.findByIdAndDelete(note_id)
            res.status(200).send({msg:"note deleted successfully"})
        }
    } catch (error) {
        res.status(400).send({msg:"note can't be deleted",error})
    }
})

module.exports = notesRouter