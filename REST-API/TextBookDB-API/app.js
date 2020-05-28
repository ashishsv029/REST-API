//run the server by typing npm run dev command

const express=require('express')
const app=express()
const expressLayouts=require('express-ejs-layouts')
const mongoose=require('mongoose')
//require('dotenv').config

//this enables the api access from any domain/origin..i.e supports cross platform suppport
const cors=require('cors')
const booksRouter=require("./router/books")
const registerRouter=require("./router/register")
const loginRouter=require('./router/login')
const bodyParser=require('body-parser')
const db=require('./config/keys').MongoURI;
//MIDDLEWARES
//bodyparser should be the 1st middleware...  it parse the data of input request
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
//app.use(expressLayouts); //since there is no layout added
app.set('view engine','ejs');
app.use(cors())  //for all rotes it is enalbled
app.use("/books",booksRouter)
app.use('/register',registerRouter)
app.use('/login',loginRouter)
//used to read JSON objects
//ROUTES
app.get("/",(req,res)=>{
    res.render('homepage')
})

//connect to a db
//the usage of storing in .env file while uploading to git/heroku people should not see our credentials
mongoose.connect(db,{ useNewUrlParser: true})
.then(()=> console.log('MongoDB Connected...'))
.catch( err=> console.log(err))

//just we connected to db
//then create a model and schema

const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log("Server running.....")
})