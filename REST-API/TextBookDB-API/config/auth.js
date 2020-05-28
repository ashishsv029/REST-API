const bcrypt=require('bcryptjs')
const mongoose=require('mongoose')

//kindha capital U e rayali endukante kinda trylo inko user rastunnam ledante ikkada complete peru marchu
const User=require('../models/User')

//THIS IS THE AUTHENTICATION SYSTEM OF OUR API
//i.e here it will check whether entered password is of same user and does it entered correctly

exports.authenticate = (email,password)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            //get user by email
            const user=await User.findOne({email:email})
            //match password
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    resolve(user)
                }else{
                    //password didnt match
                    reject("Authentication failed")
                }
            })
        }
        catch(err)
        {
            reject('authentication failed')
        }
    })    
}
