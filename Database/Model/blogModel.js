const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    
    
    AuthorUserID:{
        type:String,
        require:true,


   },
   AuthorName:{
    type:String,
    require:true,


},
    BannerImg: {
        type: String,
        require: true
    },
    Title: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    },
    BlogBody: {
        type: String,
        require: true
    },
    CreatedAt: {
        type: Date,
        require: true,
        default: Date.now
    },
    UpdatedAt: {
        type: Date,
        require: true,
        default: Date.now
    },

   

})

const blogModel = mongoose.model("blogModel", blogSchema);
module.exports = blogModel;