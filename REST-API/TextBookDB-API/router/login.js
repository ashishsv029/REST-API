const express=require('express')
const bcrypt=require('bcryptjs')
const router=express.Router()
const auth=require('../config/auth')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const config=require('../config/keys')
const nodemailer=require('nodemailer')
router.post('/',async (req,res)=>{
    const {email,password}=req.body
    console.log(email)
    console.log(password)
    console.log("hello")
    try{
        //since authenticate returns u a promise u need to await
        const user= await auth.authenticate(email,password)
        console.log(user)
        // create a jwt token for the user 
        //this token should be used to access routes...
        //sign will take payload and some options
        const token=jwt.sign(user.toJSON(),config.JWT_SECRET, {expiresIn:'240m'} )
        //to see issued at which time,expires at ..decode the token
        const {iat,exp}=jwt.decode(token)
        // commenting this feature for some time...
        /*
        var transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:"ashishsv028@gmail.com",
                pass:'Passion@1963'
            }
        })
        var mailoptions={
            from:'ashishsv028@gmail.com',
            to:email,
            subject:'JSON Web Token(JWT) Granted',
            text:`TOKEN :${token},EXPIRE_TIME :${iat},ISSUED_AT:${iat}`
        }
        transporter.sendMail(mailoptions,(err,info)=>{
            if(err){console.log(err)}
            else{console.log("Email Sent Successfully")}
        })
        */
        res.send({issued_at:iat,expiry:exp,token});

    }catch(err){
        res.json({message:"govinda"})
    }
    
})

module.exports=router