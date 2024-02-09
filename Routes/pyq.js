const express = require ("express")
const router  = express.Router()
const pyqs = require('../Database/Model/pyqModel')
const verifyToken = require('../Routes/verifyToken.js')

router.get("/getpyq", async(req ,res)=>{
    

    try {
         pyqs.find().then((data)=>{
         res.status(200).json(data)
     }).catch(err=>console.log(err))
 
     
    } catch (error) {
     console.log(error);
     
    }
 })

 router.post('/pyqs/upload', verifyToken,(req ,res)=>
{   
    const UploadedBy = req.User
    console.log(UploadedBy)
    const { Year,ExamType, Program , Course , Semester , Subject,Pdflink} = req.body
    console.log(req.body.Pdflink);
    const   PYQ = new pyqs({Year,ExamType,Program , Course,Semester,Subject,Pdflink,UploadedBy});
        PYQ.save().then(()=>{
            res.send({
                code:200,
                message:"PYQ Uploaded Successfully"
            })
        }).catch((err)=>{
            res.send({
                code:404,
                message:"Internal Server Problem"
            })
        })


   
})
router.post("/pyqs/search" ,async(req ,res)=>{
    const { Year,ExamType, Program , Course , Semester , Subject} = req.body
    try {
        pyqs.find({Year:Year,
            ExamType:ExamType,
            Program:Program,
            Course:Course,
            Semester:Semester,
            Subject:Subject}).then((data)=>{
        res.status(200).json(data)
    }).catch(err=>console.log(err))

    
   } catch (error) {
    console.log(error);
    
   }
})


router.post('/deletePyqs' , async (req ,res)=>{
    const {ObjectId} = req.body
    console.log(req.body)
    
    try {
       pyqs.deleteOne({_id:ObjectId}).then(()=>{
           res.status(200).send({message:"PYQ Deleted "})
       }).catch((err)=>
       {
           res.status(300).send({message:'Internal Server Issue'})
       })
       
    } catch (error) {
       res.status(300).send({message:'Internal Server Issue'})
    }
})

module.exports = router;
