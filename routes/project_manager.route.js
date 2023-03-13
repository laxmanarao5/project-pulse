
//import controllers
const {test,updates,concern,getAllProjects,getProjectDetails}=require("../controllers/project_manager.controller")

//import express
const exp=require("express")

//create router
const pmApp=exp.Router()

//body-parser
pmApp.use(exp.json())

//test route
pmApp.get("/test",test)

//Get all projects
pmApp.get("/projects",getAllProjects)

//Get all projects
pmApp.get("/project/:project_id",getProjectDetails)

//project_update
pmApp.post("/update/:project_id",updates)

//project concern
pmApp.post("/concern/:project_id",concern)

//export API
module.exports=pmApp

