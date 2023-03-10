//import express
const exp=require("express")

//create router
const suAdminApp=exp.Router()

//body-parser
suAdminApp.use(exp.json())

//import controllers
const {test,allocate,not_assigned_users}=require("../controllers/superAdmin.controller")

//test route
suAdminApp.get("/test",test)

//To get all records of registered users to whom role is not allocated
suAdminApp.get("/role/not-assigned-users",not_assigned_users)

//Role allocation
suAdminApp.put("/role/user/:user_email",allocate)


//export API
module.exports=suAdminApp