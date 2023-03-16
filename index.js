//import express app
const app=require("./server")
//import dot env
require("dotenv").config()

//expose to port
app.listen(process.env.PORT||80,()=>console.log("Listening to port 80"))