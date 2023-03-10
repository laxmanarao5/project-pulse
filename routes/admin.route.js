//import express
const exp=require("express")

//create router
const adminApp=exp.Router()

//body-parser
adminApp.use(exp.json())

//import controllers
const {test,addProject,getAllProjects,getProjectDetails,resolveConcern,modifyProject,grantResources,deleteProject,undoDeleteProject}=require("../controllers/admin.controller")

//test route
adminApp.get("/test",test)

//add project
adminApp.post("/project",addProject)

//Modify project
adminApp.put("/project",modifyProject)

//get all projects
adminApp.get("/projects",getAllProjects)

//Delete project
adminApp.delete("/project/:project_id",deleteProject)

//Undo delete
adminApp.patch("/project/:project_id",undoDeleteProject)

//get project full details
adminApp.get("/project/:project_id",getProjectDetails)

//resolve a concern
adminApp.put("/concern/:concern_id",resolveConcern)

//Grant resources
adminApp.put("/resource/:request_id",grantResources)

//export admin API
module.exports=adminApp