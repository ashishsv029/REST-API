const express=require('express')
const router=express.Router()
const Book=require('../models/Book')
const jwt=require('jsonwebtoken')
const config=require('../config/keys')


//RESTFUL API ROUTES

//1
//get all books
router.get("/",verifyToken,async (req,res)=>{
    //res.send("Insides cases route")
    jwt.verify(req.token,config.JWT_SECRET,async (err,authData)=>{
        if(err)
            res.sendStatus(403)
    try{
        const getbooks=await Book.find();
        res.json(getbooks)

    }catch(err){
        res.json({message:err})
    }
})
})
//2
//through isbn number
router.get("/:isbn",verifyToken,async (req,res)=>{
    jwt.verify(req.token,config.JWT_SECRET,async (err,authData)=>{
        if(err)
            res.sendStatus(403)
    try{
        const bookbyid=await Book.find({ISBN_NO:req.params.isbn})
        res.json(bookbyid)
    }
    catch(err)
    {
        res.json({message:err})
    }
})
})

//3
// through /book/bookname

router.get("/book/:bookname",verifyToken,async (req,res)=>{
    jwt.verify(req.token,config.JWT_SECRET,async (err,authData)=>{
        if(err)
            res.sendStatus(403)
        
    try{
        const bookbyname=await Book.find({Title:req.params.bookname})
        res.json(bookbyname)
    }catch(err)
    {
        res.json({message:err})
    }
})
})
//4
//through /author/authorname
router.get("/author/:authorname",verifyToken,async (req,res)=>{
    jwt.verify(req.token,config.JWT_SECRET,async (err,authData)=>{
        if(err)
            res.sendStatus(403)
    try{
        const bookbyauthor=await Book.find({Author:req.params.authorname})
        res.json(bookbyauthor)
    }catch(err)
    {
        res.json({message:err})
    }
})
})


//5
//through  /genre/genrename
router.get("/genre/:genrename",verifyToken,async (req,res)=>{
    jwt.verify(req.token,config.JWT_SECRET,async (err,authData)=>{
        if(err)
            res.sendStatus(403)
    try{
        const bookbygenre=await Book.find({Genre:req.params.genrename})
        res.json(bookbygenre)
    }catch(err)
    {
        res.json({message:err})
    }
})
})


//6
//through /genre/genrename/subgenre
router.get("/genre/:genrename/:subgenrename",verifyToken,async (req,res)=>{
    jwt.verify(req.token,config.JWT_SECRET,async (err,authData)=>{
        if(err)
            res.sendStatus(403)
    try{
        const bookbysubgenre=await Book.find({Genre:req.params.genrename,SubGenre:req.params.subgenrename})
        res.json(bookbysubgenre)
    }catch(err)
    {
        res.json({message:err})
    }
})
})

//7
//through /genre/genrename/author/authorname
router.get("/genre/:genrename/author/:authorname",verifyToken,async (req,res)=>{
    jwt.verify(req.token,config.JWT_SECRET,async (err,authData)=>{
        if(err)
            res.sendStatus(403)
    try{
        const bookbyauthor=await Book.find({Genre:req.params.genrename,Author:req.params.authorname})
        res.json(bookbyauthor)
    }catch(err)
    {
        res.json({message:err})
    }
})
})
//through ratings
router.get("/minrating/:rating",async (req,res)=>{
    try{
        var no=int()
        const booksbyrating=await Book.find({Ratings_count:{$gt:"30000"}})
        res.json(booksbyrating)
    }catch(err)
    {
        res.json({message:err})
    }
})

//1
//post case
router.post("/",verifyToken,(req,res)=>{
    jwt.verify(req.token,config.JWT_SECRET,async (err,authData)=>{
        if(err)
            res.sendStatus(403)
        else
        {
            if(req.body.batch)  //handling array of json documents code...create will automatically save
            {
                Book.create(req.body.batch,(err)=>{
                    if(err)
                    res.send(err)
                    else
                    res.json(req.body)
                })
            }
            else{ 
                  //for single json object...
                var newbook=new Book(req.body)
                newbook.save((err)=>{
                    if(err)
                    res.send(err)
                    else
                    res.json(req.body)
                })
            }
            /*try{

                const newbook=new Book({

                    ISBN_NO:req.body.ISBN_NO,
                    Title:req.body.Title,
                    Author:req.body.Author,
                    Genre:req.body.Genre,
                    SubGenre:req.body.SubGenre,
                    Height_cms:req.body.Height_cms,
                    Publisher:req.body.Publisher,
                    Cost:req.body.Cost,
                    Ratings_count:req.body.Ratings_count,
                    Year_of_release:req.body.Year_of_release
                
                });
               const uploadedbook=await newbook.save()
                res.json(uploadedbook)
            }catch(err){
                res.json({message:err})
            }*/
        }
    })
    

})

//4
//delete post
router.delete("/:isbn",async (req,res)=>{
    try{
        const deletedbook=await Case.remove({ISBN_NO:req.params.isbn});
        res.json(deletedbook)
        console.log("deleted successfully")
    }catch(err){res.json({message:err})}
})

router.patch("/update/:isbn",async (req,res)=>{
    try{
        console.log("okay")
        var updated;
        if(req.body.Author)
        {
            console.log("pop")
            updated=await Book.updateOne({ISBN_NO:req.params.isbn},{$set:{Author:req.body.Author}})
            //res.json(updateauthor)
        }
        if(req.body.Genre)
        {
            updated=await Book.updateOne({ISBN_NO:req.params.isbn},{$set:{Genre:req.body.Genre}})
            //res.json(updategenre)
        }
        if(req.body.Title)
        {
            console.log("po2")
            updated=await Book.updateOne({ISBN_NO:req.params.isbn},{$set:{Title:req.body.Title}})
        //res.json(updatetitle)
        }
      
        if(req.body.SubGenre)
        {
            updated=await Book.updateOne({ISBN_NO:req.params.isbn},{$set:{Genre:req.body.SubGenre}})
            //res.json(updatesubgenre)
        }
        if(req.body.Ratings_count)
        {
            updated=await Book.updateOne({ISBN_NO:req.params.isbn},{$set:{Ratings_count:req.body.Ratings_count}})
            //res.json(updateratings)
        }
        if(req.body.Cost)
        {
            updated=await Book.updateOne({ISBN_NO:req.params.isbn},{$set:{Cost:req.body.Cost}})
            //res.json(updatecost)
        }
        if(req.body.Year_of_release)
        {
            updated=await Book.updateOne({ISBN_NO:req.params.isbn},{$set:{Year_of_release:req.body.Year_of_release}})
            //res.json(updateyear)
        }
        if(req.body.ISBN_NO)
        {
            updated=await Book.updateOne({ISBN_NO:req.params.isbn},{$set:{ISBN_NO:req.body.ISBN_NO}})  
        }
        res.json(updated)
    }catch(err){
        console.log(err)
    }
})



//FORMAT OF TOKEN

//Authorization: Bearer <access_token>

function verifyToken(req,res,next){
    //get auth header value
    const bearerHeader=req.headers['authorization'];
    //check if bearer is undefined
    if(typeof(bearerHeader)!=='undefined')
    {
        //split at space
        const bearer=bearerHeader.split(' ');
        //get token from the array
        const bearerToken=bearer[1];
        //set the token
        req.token=bearerToken;
        //next middleware
        next()
    }
    else{
        res.sendStatus(403)
    }
}




module.exports=router;