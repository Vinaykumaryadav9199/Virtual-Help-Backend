const express = require("express")
const router = express.Router()
const blogs = require("../Database/Model/blogModel")
const User = require("../Database/Model/userModel")
const verifyToken = require('../Routes/verifyToken.js')


router.post("/blogPost", verifyToken,  async(req, res) => {
    const AuthorUserID =(req.User)
    const UserDetails = await User.findOne({_id: AuthorUserID})
    const AuthorName = UserDetails.Name


    const {  Title, BannerImg, Description, BlogBody } = req.body;
   

    const Blogs = new blogs({
        AuthorUserID, AuthorName, BannerImg, Title, Description, BlogBody,
    })
    Blogs.save().then(() => {
        
        res.status(200).send({message:'Blog Posted'})
    }).catch((err) => {
        
        res.status(201).send({message:'Blog not Posted'})
    })

})
router.get("/showblogs", async (req, res) => {
    try {
        blogs.find({}).then( async(data) => {
            
            res.send(data);
        })
            .catch((err) => {
                res.send(err)
            });

    }
    catch (err) {

        console.log(err)
        res.send(err);
    }
})

router.post('/deleteBlog' , async (req ,res)=>{
    const {ObjectId} = req.body
    
    
    try {
       blogs.deleteOne({_id:ObjectId}).then(()=>{
           res.status(200).send({message:"Blog Deleted"})
       }).catch((err)=>
       {
           res.status(300).send({message:'Internal Server Issue'})
       })
       
    } catch (error) {
       res.status(300).send({message:'Internal Server Issue'})
    }
})
module.exports = router