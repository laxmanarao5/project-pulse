//import express
const exp=require("express")

//create router
const suAdminApp=exp.Router()

//body-parser
suAdminApp.use(exp.json())

//import controllers
const {test,allocate,not_assigned_users,getUsers,deleteUser,undoDeleteUser}=require("../controllers/superAdmin.controller")

//test route
suAdminApp.get("/test",test)

//To get all records of registered users to whom role is not allocated
suAdminApp.get("/role/not-assigned-users",not_assigned_users)

//To get all records of registered users
suAdminApp.get("/role/users",getUsers)

//Role allocation
suAdminApp.put("/role/user/:user_email",allocate)

//soft-delete user
suAdminApp.delete("/delete/user/:email",deleteUser)

//undo-deletion
suAdminApp.patch("/delete/user/:email",undoDeleteUser)


//export API
module.exports=suAdminApp