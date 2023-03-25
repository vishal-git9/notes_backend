const mongoose = require("mongoose")

const notesSchema = mongoose.Schema({
    title:String,
    subject:String,
    body:String,
    userId:String
})


const notesModel = mongoose.model("notes",notesSchema)

module.exports = notesModel