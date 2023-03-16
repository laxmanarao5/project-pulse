//import express
const exp=require("express")

//call the express fucntion
const app=exp()

//import database connection
const {sequelize}=require("./databse/db.config")

//Test Database connection
sequelize.authenticate()
.then(()=>console.log("Connection sucess"))
.catch(err=>console.log("Error occured : ",err))

//import APIs
const suAdminApp=require("./routes/superAdmin.route")
const userApp=require("./routes/user.route")
const adminApp=require("./routes/admin.route")
const pmApp=require("./routes/project_manager.route")
const gdoApp = require("./routes/gdo.route")

//import authentication middlewares
const {superUSerPrivateRoute}=require("./middlewares/superUserPrivateRoute.middleware") 
const { gdoPrivateRoute } = require("./middlewares/gdoPrivateRoute.middleware")
const { pmPrivateRoute } = require("./middlewares/pmPrivateRoute.middleware")
const { adminPrivateRoute } = require("./middlewares/adminPrivatrRoute.middleware")


//Routing to Super admin API
app.use("/super-admin",superUSerPrivateRoute,suAdminApp)

//Routing to User API
app.use("/user",userApp)

//Routing to admin API
app.use("/admin",adminPrivateRoute,adminApp)

//Routing to Project manager API
app.use("/project-manager",pmPrivateRoute,pmApp)

//Routing to GDO head
app.use("/gdo",gdoPrivateRoute,gdoApp)



//Invalid path middleware
app.use("*",(req,res)=>{
    res.send({message:"Invalid path"})
})

//Error handler middleware
app.use((err,req,res,next)=>{
    res.send({message:"error occured",error:err.message})
})


//export app
module.exports=app