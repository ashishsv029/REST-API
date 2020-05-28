const express=require('express')
const bcrypt=require('bcryptjs')
const router=express.Router()
const timestamp=require('mongoose-timestamp')
const User=require('../models/User')
router.get("/",(req,res)=>{
    res.send("hello")
});
router.post("/",async (req,res)=>{
    try{
        const {email,password}=req.body
            const ckuser=await User.findOne({email})
            //if the email already exists return existing user
            if(ckuser)
            {
                res.json({message:"existing user.Try with other mailid"})
            }
            else{
            const newuser=new User({
                email:req.body.email,
                password:req.body.password,
                name:req.body.name,
            })
            //generate salt with a key then write a callback which takes saltvalue and hash ur password with that salt
            bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newuser.password,salt,async (err,hash)=>{
                    //update the hashed password with the user password...
                    newuser.password=hash;
                    const uploadeduser=await newuser.save()
                    res.render("homepage")
                });
            })
        }
            
    }catch(err)
    {
        res.json({message:err})
    }
})

//login and authentication

module.exports=router;