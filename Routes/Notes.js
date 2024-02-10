const express = require ("express")
const router  = express.Router()
const notes = require("../Database/Model/nodesModel.js")
const verifyToken = require('../Routes/verifyToken.js')

router.get("/getNotes", async(req ,res)=>{
   // console.log(req.cookies.aid)
    

   try {
    notes.find().then((data)=>{
        res.status(200).json(data)
    }).catch(err=>console.log(err))

    
   } catch (error) {
    console.log(error);
    
   }
})
router.get('/',(req,res)=>
{
    res.send("ok Every thing is fine ")
})
router.post('/notes/upload',verifyToken,(req ,res)=>
{   
    const uploadedby =  req.User
  
    const {Program , Course , Semester , Subject,Pdflink } = req.body
    const  Notes = new notes({Program , Course,Semester,Subject,Pdflink,uploadedby});
        Notes.save().then(()=>{
            
            res.send({code:200,message:"Notes Uploaded Successfully"})
        }).catch((err)=>{
            res.send({code:201, message:"internal Server Error"})
        })


    
})

router.post('/notes/search',(req ,res)=>{
    const {Program , Course , Semester , Subject} = req.body
    
   try {
    notes.find({Program:Program ,Course :Course ,Semester:Semester ,Subject:Subject}).then((data)=>{
        res.status(200).json(data)
    }).catch(err=>console.log(err))

    
   } catch (error) {
    console.log(error);
    
   }
})

router.post('/deleteNotes' , async (req ,res)=>{
     const {ObjectId} = req.body
     console.log(req.body)
     
     try {
        notes.deleteOne({_id:ObjectId}).then(()=>{
            res.status(200).send({message:"Notes deleted"})
        }).catch((err)=>
        {
            res.status(300).send({message:'Internal Server Issue'})
        })
        
     } catch (error) {
        res.status(300).send({message:'Internal Server Issue'})
     }
})
module.exports = router;
