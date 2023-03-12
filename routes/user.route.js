//import express
const exp=require("express")

//create router
const userApp=exp.Router()

//body-parser
userApp.use(exp.json())

//import controllers
const {test,register,login,forgetpassword,resetPassword}=require("../controllers/user.controller")

//test route
userApp.get("/test",test)

//Registration
userApp.post("/register",register)

//Login
userApp.post("/login",login)

//Forget password
userApp.post("/forget-password",forgetpassword)

//reset-password
userApp.post("/reset-password//email/:email",resetPassword)

//export API
module.exports=userApp