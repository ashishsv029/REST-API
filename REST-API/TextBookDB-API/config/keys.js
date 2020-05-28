module.exports={
    ENV:process.env.NODE_ENV||"development",
    PORT:process.env.PORT||3000,
    URI:process.env.BASE_URI||'http://localhost:3000',
    MongoURI:'mongodb+srv://ashishsv028:password@ashishcluster-efhjg.mongodb.net/test2?retryWrites=true&w=majority',
    JWT_SECRET:process.env.JWT_SECRET||'secretissecret'
}

//in keys.js
// module.exports='hello world'
//in app.js
//var msg=require(./keys.js)
//console.log(msg)
//ops:->hello world
