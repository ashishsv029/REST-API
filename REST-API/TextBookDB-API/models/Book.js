const mongoose =require('mongoose')
const timestamp=require('mongoose-timestamp') 
const bookSchema=new mongoose.Schema({
   ISBN_NO:{
        type:String,
        required:true
   },
   Title:{
       type:String,
       required:true
   },
    Author:{
        type:String,
        required:true
    },
    Genre:{
        type:String,
        required:true
    },
    SubGenre:{
        type:String,
        required:true
    },
    Height_cms:{
        type:String,
        required:true
    },
    Publisher:{
        type:String,
        required:true
    },
    Cost:{
        type:String,
        required:true
    },
    Ratings_count:{
        type:String,
        required:true
    },
    Year_of_release:{
        type:String,
        required:true
    }

})
bookSchema.plugin(timestamp);
const Book=mongoose.model("Book",bookSchema);
module.exports=Book;
