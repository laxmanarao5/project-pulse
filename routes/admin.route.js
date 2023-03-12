//import express
const exp=require("express")

//create router
const adminApp=exp.Router()

//body-parser
adminApp.use(exp.json())

//import controllers
const {test,addProject,getAllProjects,getProjectDetails,resolveConcern}=require("../controllers/admin.controller")

//test route
adminApp.get("/test",test)

//add project
adminApp.post("/project",addProject)

//get all projects
adminApp.get("/projects",getAllProjects)

//get project full details
adminApp.get("/project/:project_id",getProjectDetails)

//resolve a concern
adminApp.put("/concern/:concern_id",resolveConcern)

//export admin API
module.exports=adminApp