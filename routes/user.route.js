//import express
const exp=require("express")

//create router
const userApp=exp.Router()

//body-parser
userApp.use(exp.json())

//import controllers
const {test,register,login}=require("../controllers/user.controller")

//test route
userApp.get("/test",test)

//Registration
userApp.post("/register",register)

//Login
userApp.post("/login",login)

//export API
module.exports=userApp