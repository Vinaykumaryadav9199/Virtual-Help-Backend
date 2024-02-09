const mongoose = require('mongoose');

const pyqSchema = new mongoose.Schema({
    Year:{
        type:String,
        require:true

    },
    ExamType:{
        type:String,
        require:true

    },
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
    UploadedBy:{
        type:String,
        require:true
    },
    UploadedAt:{
        type: Date,
        require: true,
        default: Date.now
    }

    

})
const pyqs = mongoose.model("pyqs", pyqSchema);
module.exports = pyqs;
