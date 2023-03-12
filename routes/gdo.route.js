//import express
const exp=require("express")

//create router
const gdoApp=exp.Router()

//body-parser
gdoApp.use(exp.json())

//import controllers
const {test,addProject,getAllProjects,getProjectDetails,resolveConcern,allocateTeam}=require("../controllers/gdo.controller")

//test route
gdoApp.get("/test",test)

//add project
gdoApp.post("/project",addProject)

//allocate team
gdoApp.post("/team/project/:project_id",allocateTeam)

//get all projects
gdoApp.get("/projects",getAllProjects)

//get project full details
gdoApp.get("/project/:project_id",getProjectDetails)

//resolve a concern
gdoApp.put("/concern/:concern_id",resolveConcern)

//export admin API
module.exports=gdoApp