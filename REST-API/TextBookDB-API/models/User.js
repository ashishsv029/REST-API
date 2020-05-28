const mongoose=require('mongoose')
const timestamp=require('mongoose-timestamp') 
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true
    }
})
userSchema.plugin(timestamp);
module.exports=mongoose.model('User',userSchema);