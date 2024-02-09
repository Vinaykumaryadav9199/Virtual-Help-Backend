const express = require("express")
const router = express.Router()
const blogs = require("../Database/Model/blogModel")
router.get('/tc',(req,res)=>
{
    res.send("ok Every thing is fine ")
})

router.post("/BlogsPage" ,async(req ,res)=>{
    const {id } = req.body
    try {
        blogs.find({_id:id}).then((data)=>
        {
                res.json(data)
        })
    } catch (error) {
        
        res.json({message:"Cant get Blogs"})
    }
})

module.exports = router;