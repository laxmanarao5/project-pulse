//import 
const expressAsyncHandler = require("express-async-handler")

//importing operator from sequelize
const { Op } = require('sequelize');

//import projects model
const {Project}=require("../databse/models/projects.model")
const {Concerns}=require("../databse/models/concerns.model")

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

//Get all projects
exports.getAllProjects=expressAsyncHandler(async(req,res)=>{
    let result=await Project.findAll({attributes:["project_name","client","client_account_manager","status","start_date","end_date","fitness_indicator"]
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
    let result=await Project.findOne({where:{project_id:req.params.project_id},include:[
        {association:Project.Updates,attributes:{exclude:["project_id","update_id"]}},
        {association:Project.Concerns,attributes:{exclude:["project_id","concern_id"]}},
        {association:Project.Employees,attributes:{exclude:["project_id"]}}],
        attributes:["project_name","client","client_account_manager","status","start_date","end_date","fitness_indicator","domain","project_type"]
    })
    //sending response
    let team_members=result.employees.length+3
    result.dataValues.team_members=team_members
    res.send({messages:"Projects ",payload:result})
})

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

