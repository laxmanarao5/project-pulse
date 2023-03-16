//import 
const expressAsyncHandler = require("express-async-handler")

//importing operator from sequelize
const { Op } = require('sequelize');

//import projects model
const {Project}=require("../databse/models/projects.model")
const {Concerns}=require("../databse/models/concerns.model");
const { Updates } = require("../databse/models/updates.model");
//test controller
exports.test=(req,res)=>{
    res.send({message:"Admin API working fine"})
}

//Add project details
exports.addProject=expressAsyncHandler(async(req,res)=>{
    req.body.fitness_indicator="red"
    await Project.create(req.body)
    res.send({message:"Project added sucessfully"})
})

//Modify project
exports.modifyProject=expressAsyncHandler(async(req,res)=>{
    await Project.update(req.body)
    res.send({message:"Project updated sucessfully"})
})

//Get all projects
exports.getAllProjects=expressAsyncHandler(async(req,res)=>{
    let result=await Project.findAll({where:{active:true},attributes:["project_name","client","client_account_manager","status","start_date","end_date","fitness_indicator"]
    })
    res.send({messages:"Projects ",payload:result})
})

//Get project information
exports.getProjectDetails=expressAsyncHandler(async(req,res)=>{
    //today date
    let endOfDateRange=new Date()

    //Date before two weeks
    let startOfDateRange=new Date()
    startOfDateRange.setDate(endOfDateRange.getDate() - 14)
    console.log(startOfDateRange,endOfDateRange);

    //fetching project detailed info from database
    let result=await Project.findOne({where:{project_id:req.params.project_id,active:true},include:[
       // {association:Project.Updates,attributes:{exclude:["project_id","update_id"]}},
        {association:Project.Concerns,attributes:{exclude:["project_id"]}},
        {association:Project.Employees,attributes:{exclude:["project_id"]}},
        {association:Project.ResourcingRequests,attributes:{exclude:["project_id"]}}],
        attributes:["project_name","client","client_account_manager","status","start_date","end_date","fitness_indicator","domain","project_type"]
    })
    if(result==null)
    res.send({message:"Project not found"})
    //today date
    let today = new Date();
    //create an object to store the date of the day before two weeks
    let dateBeforeTwoWeeks = new Date();
    //assign date of the date of the day before two weeks
    dateBeforeTwoWeeks.setDate(today.getDate() - 14);
    //get project updates
    let projectUpdates=await Updates.findAll({where:{
        project_id:req.params.project_id,
        date:{
            [Op.between]:[dateBeforeTwoWeeks,today]
        }
    }})
    //sending response
    let team_members=result.employees.length+3
    result.dataValues.updates=projectUpdates
    result.dataValues.team_members=team_members
    res.send({messages:"Projects ",payload:result})
})

//resolve concern
exports.resolveConcern=expressAsyncHandler(async(req,res)=>{
    let date=new Date()
    //add today date to request body
    req.body.mitigated_on_date=date
    //updating concern
    await Concerns.update(req.body,{where:{
        concern_id:req.params.concern_id
    }})
    //sending response
    res.send({message:"Concern resolved"})
})

//Grant resources
exports.grantResources=expressAsyncHandler(async(req,res)=>{
    //updating concern
    await Concerns.update({status:true},{where:{
        request_id:req.params.request_id
    }})
    //sending response
    res.send({message:"Concern resolved"})
})

//Soft-Delete project

exports.deleteProject=expressAsyncHandler(async(req,res)=>{
    let updateCount=await Project.update({active:false},{where:{
        project_id:req.params.project_id
    }})
    if(updateCount!=0)
    res.send({message:"Project deleted sucessfully"})
    else
    res.status(204).send({message:"user not found to update"})
})


//undo-Delete project
exports.undoDeleteProject=expressAsyncHandler(async(req,res)=>{
    let updateCount=await Project.update({active:true},{where:{
        project_id:req.params.project_id
    }})
    if(updateCount!=0)
    res.send({message:"Project deleted undo sucessfully"})
    else
    res.status(204).send({message:"user not found to update"})
})