const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    Program: {
        type: String,
        require: true
    },
    Course: {
        type: String,
        require: true
    },
    Semester: {
        type: String,
        require: true
    },
    Subject: {
        type: String,
        require: true
    },
    Pdflink: {
        type: String,
        require: true
    },
    uploadedby:{
        type:String,
        require:true

    }

})
const notes = mongoose.model("notes", notesSchema);
module.exports = notes;
