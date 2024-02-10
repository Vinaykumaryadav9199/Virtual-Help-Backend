const express = require ("express")
const router  = express.Router()
const cookieParser = require("cookie-parser")
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpgenrator = require('otp-generator')
const user = require('../Database/Model/userModel');
const userVerification = require("../Database/Model/userVerificationModel")
const verifyToken = require('../Routes/verifyToken.js')
const JWT_SECRET = 'vinay';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'virtualhelp62@gmail.com',
      pass: 'vulb xuqy coij riye'
    }
  });
  router.use(cookieParser());
 
  router.get("/hello",(req,res)=>{
    res.send({
        code:200,
        message:"ok"
    })
  })


// Router 1:  Router for Sending OTP to the user  for Signup......
router.post("/sendOtp" ,async(req ,res)=>{
    const {Name ,Email ,Password ,ConfirmPassword } = req.body

   try {
    const User = await user.findOne({Email})
    if(User)
    {
        res.send({
            code:422,
            message:"This Email is Already Register"
        })
    }
    else{

        const otpExist = await userVerification.findOne({Email})
        if(otpExist)
        {
            const otp =otpgenrator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});
            userVerification.updateOne({Email:Email} ,{$set:{OTP:otp}}).then(()=>{
                const mailOptions = {
                    from: 'virtualhelp62@gmail.com',
                    to: Email,
                    subject: 'VIRTUAL HELP One Time Password',
                    text: `Dear ${Name}, use this One Time Password ${otp} to Register in VIRTUAL HELP This OTP will be valid for the next 5 mins.`
                  };

                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error)
                      res.send({code:424 , message:"Otp not sended"})
                    } else {
                     res.send({
                        code:200,
                        message:"OTP Sended"
                     })
                    }
                  });
            }).catch(()=>{
                res.send({
                    code:401,
                    message:"internal Server Error"
                })
            })
        }
        else{
            const otp =otpgenrator.generate(6, { upperCaseAlphabets: false, specialChars: false , lowerCaseAlphabets:false });
            const newVerification =  new userVerification({Email:Email ,OTP:otp})
            newVerification.save().then(()=>{
                const mailOptions = {
                    from: 'virtualhelp62@gmail.com',
                    to: Email,
                    subject: 'VIRTUAL HELP One Time Password',
                    text: `Dear ${Name}, use this One Time Password  ${otp}  to Register in VIRTUAL HELP This OTP will be valid for the next 5 mins.`
                  };

                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error)
                      res.send({code:424 , message:"Otp not sended"})
                    } else {
                     res.send({
                        code:200,
                        message:"Opt Sended"
                     })
                    }
                  });


            }).catch(()=>{
                res.send({
                    code:402,
                    message:"internal Server Error "
                })
            })
        }

    }
    
   } catch (error) {
    console.log(error)
    res.send({
        code:403,
        message:"internal server Error"
    })
    
   }


})


// Router 2 :Router for  Signup to user 

router.post('/Signup', async(req , res)=>{
    const {Name ,Email ,Password ,ConfirmPassword , OTP} = req.body
    const otpExist = await userVerification.findOne({Email})
    if (otpExist)
    {
        if (otpExist.OTP == OTP){
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(Password ,salt);
            const newUser = new user ({
                Name:Name,
                Email:Email,
                Password:secPass
            })
            
            newUser.save().then(()=>{
                res.send({
                    code:200,
                    message:"Succesfully Register "
                })
            }).catch((err)=>{
                res.send({
                    code:502,
                    message:"not register succesfully due to internal Error"
                })
            })

        }
        else{
            res.send({
                code:400,
                message:"wrong otp"
            })
        }
    }
    else{
        res.send({
            code:410,
            message:"OTP Expired"
        })
    }

})

// Route 3: Route for Login User 

router.post("/Login" ,async(req, res)=>{
    const {Email , Password} =  await req.body
    const User = await user.findOne({Email})
    if(User)
    {
        const passwordcompare  =  await bcrypt.compare(Password , User.Password)
        console.log(passwordcompare)
        if (passwordcompare)
        {    
            const payload = {
                user:{
                    key:User.id
                }
            }

           
            const authToken = jwt.sign(payload,JWT_SECRET);
            
            // res.cookie('token', authToken, {
            //     httpOnly: true,
            //     secure: false , // Enable only for HTTPS connections
            //     sameSite: 'strict', // or 'Lax' depending on your needs
            //     path: '/' 
            //   });

            res.cookie('token', authToken, {
                // domain:'.vercel.app',
                path: '/',
                httpOnly: true,
               // secure: process.env.NODE_ENV === 'production', // Ensure HTTPS in production
                secure:true,
                sameSite: 'none', // Adjust as needed
              }).send({
                code:200,
                message:"Succesfully Login",
                token:authToken
                
            });
            
            

            
        }
        else{
            res.send({
                code :400,
                message:"Please try to Login with correct credentials"
            })
        }
        
    }
    else{
        res.send({
            code:400,
            message:"please try to Login with Correct Credentials"
        })

        
    }
})


//Route 4: Router For the send otp for  forget password 

router.post("/forgetPasswordOtp" , async(req , res)=>{
    const {Email} = await req.body;
    const User = await user.findOne({Email})
    if(User)
    {
       
        const otpExist = await userVerification.findOne({Email})
        if(otpExist)
        {
            const otp =otpgenrator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false });
            userVerification.updateOne({Email:Email} ,{$set:{OTP:otp}}).then(()=>{
                const mailOptions = {
                    from: 'virtualhelp62@gmail.com',
                    to: Email,
                    subject: 'VIRTUAL HELP One Time Password',
                    text: `Dear , the one time password  to reset your password at VIRTUAL HELP is  ${otp}. This OTP will expire in 5 minutes.`
                  };

                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error)
                      res.send({code:424 , message:"Otp not sended"})
                    } else {
                     res.send({
                        code:200,
                        message:"OTP Sended"
                     })
                    }
                  });
            }).catch((err)=>{
                console.log(err)
                res.send({
                    code:401,
                    message:"internal Server Error"
                })
            })
        }
        else{
            const otp =otpgenrator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false });
            const newVerification =  new userVerification({Email:Email ,OTP:otp})
            newVerification.save().then(()=>{
                const mailOptions = {
                    from: 'virtualhelp62@gmail.com',
                    to: Email,
                    subject: 'VIRTUAL HELP One Time Password',
                    text: `Dear , the one time password  to reset your password at VIRTUAL HELP is  ${otp}. This OTP will expire in 5 minutes.`
                  };

                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error)
                      res.send({code:424 , message:"Otp not sended"})
                    } else {
                     res.send({
                        code:200,
                        message:"OTP Sended"
                     })
                    }
                  });


            }).catch((err)=>{
                console.log(err)
                res.send({
                   
                    code:402,
                    message:"internal Server Error "
                })
            })
        }



    }
    else{
        res.send({
            code:400,
            message:"please try to fill correct Credential"
        })
    }

})
 
//Router 5: Router for Reset Password

router.post("/resetPassword" ,async(req ,res)=>{
    const {Email , OTP ,NewPassword} = await req.body
    const UserVerify =  await userVerification.findOne({Email})
    if (UserVerify)
    {
        if(UserVerify.OTP == OTP)
        {   
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(NewPassword ,salt)
            user.updateOne({Email:Email} ,{$set:{Password:secPass}}).then(()=>{
                res.send({
                    code:200,
                    message:"Password Succesfully Reset"
                })
                res.redirect('/Login');
            })
        }
        else{
            res.send({
                code:400,
                message:"please Enter Correct OTP"
            })
        }
    }
   else{
    res.send({
        code:410,
            message:"OTP Expired"
    })
   }
})


// Rourt for chech user is login or not ;

router.get("/CheckLogin" ,async(req ,res)=>{
     const token = await req.cookies.token;
     console.log(req.cookies)
    if (!token) {
        return res.status(300).send({ code:"401" ,message:"Please Login First"});
      }
      jwt.verify(token,JWT_SECRET , async(err, decoded) => {
        if (err) {
          // Token verification failed
          return res.status(402).send({ code:'401',message:"Invailed User"});
        } else {
          // Token is valid, 'decoded' contains the decoded payload (claims)
          
          const userid =decoded.user.key
          const User = await user.findOne({ _id:userid})
          
          return res.status(200).send({message:"Login",
            UserData: User });
        }
    }
      )

    

        
})

// Route for Logout User 

// Assuming you have an Express route for logout
router.get('/logout', (req, res) => {
    res.clearCookie('token' , { domain: 'virtual-help-backend.vercel.app' });
    res.redirect('/'); // Redirect to the home page or any other desired destination
});





module.exports = router
