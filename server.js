//import express
const exp=require("express")

//call the express fucntion
const app=exp()

//import dot env
require("dotenv").config()

//expose to port
app.listen(process.env.PORT||80,()=>console.log("Listening to port 80"))

//import database connection
const {sequelize}=require("./databse/db.config")

//Test Database connection
sequelize.authenticate()
.then(()=>console.log("Connection sucess"))
.catch(err=>console.log("Error occured : ",err))

//import APIs
const suAdminApp=require("./routes/superAdmin.route")
const userApp=require("./routes/user.route")

//import authentication middleware
const {superUSerPrivateRoute}=require("./middlewares/superUserPrivateRoute.middleware") 

//Routing to Super admin API
app.use("/super-admin",superUSerPrivateRoute,suAdminApp)

//Routing to User API
app.use("/user",userApp)




//Invalid path middleware
app.use("*",(req,res)=>{
    res.send({message:"Invalid path"})
})

//Error handler middleware
app.use((err,req,res,next)=>{
    res.send({message:"error occured",error:err.message})
})