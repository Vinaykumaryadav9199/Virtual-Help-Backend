const express = require("express")
const router = express.Router()
const cookieParser = require("cookie-parser")
const blogs = require("../Database/Model/blogModel")
const pyqs = require('../Database/Model/pyqModel')
const notes = require("../Database/Model/nodesModel.js")
const verifyToken = require('../Routes/verifyToken.js')
router.use(cookieParser())


router.use(cookieParser());

router.get('/allData',  verifyToken , async(req ,res)=>{

  
   try{
      
      const id = req.User
   const Blogs = await blogs.find({AuthorUserID:req.User})
   
   const Pyqs = await pyqs.find({UploadedBy:req.User})
  
   const Notes = await notes.find({uploadedby:req.User})
  
   res.status(200).send({Blogs , Pyqs ,Notes })

   }
   catch(err){
      res.status(400).send(err)

   }
  

})

module.exports = router