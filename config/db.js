const mongoose = require("mongoose")
// url for env

// connecting with mongo
const connection = mongoose.connect(`mongodb+srv://vishal:vishalsingh@cluster0.lytc8c7.mongodb.net/noteapp?retryWrites=true&w=majority`)

// exporting the connection

module.exports = connection