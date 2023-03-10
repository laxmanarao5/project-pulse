//import 
const expressAsyncHandler = require("express-async-handler")

//import dotenv
require("dotenv").config()

//import jwt
const jwt=require("jsonwebtoken")

//importing operator from sequelize
const { Op, DATE } = require('sequelize');

//import projects model
const {Project}=require("../databse/models/projects.model")
const { Employees } = require("../databse/models/employees.model");
const { ResourcingRequests } = require("../databse/models/resourcingRequest.model");
const { Updates } = require("../databse/models/updates.model");

//Associations
Project.Employees=Project.hasMany(Employees,{foreignKey:"project_id"})
Project.ResourcingRequests=Project.hasMany(ResourcingRequests,{foreignKey:"project_id"})

//test controller
exports.test=(req,res)=>{
    res.send({message:"GDO API working fine"})
}

//Add project details
exports.addProject=expressAsyncHandler(async(req,res)=>{
    try{
        let [bearer,token]=req.headers.authorization.split(" ")
        let result=jwt.verify(token,process.env.SECRET_KEY)
        req.body.gdo=result.email
        req.body.fitness_indicator="red"
        await Project.create(req.body)
    }
    catch(err){}
    
    res.send({message:"Project added sucessfully"})
})

//Allocate team to project
exports.allocateTeam=expressAsyncHandler(async(req,res)=>{
    req.body.team.map(async(obj)=>{
        let date=new Date()
        obj.start_date=date
        obj.status=true
        obj.billing_status="billed"
        obj.project_id=req.params.project_id
        await Employees.create(obj)
    })
    res.send({message:"Team allocated sucessfully"})
})

//Get all projects
exports.getAllProjects=expressAsyncHandler(async(req,res)=>{
    try{
        let [bearer,token]=req.headers.authorization.split(" ")
        let user=jwt.verify(token,process.env.SECRET_KEY)
        let result=await Project.findAll({where:{gdo:user.email,active:true},attributes:["project_name","client","client_account_manager","status","start_date","end_date","fitness_indicator"]
    })
    res.send({messages:"Projects ",payload:result})
    }
    catch(err){}
    
})

//Get project information
exports.getProjectDetails=expressAsyncHandler(async(req,res)=>{
    try{
        let [bearer,token]=req.headers.authorization.split(" ")
        let user=jwt.verify(token,process.env.SECRET_KEY)
    
    
    //today date
    let endOfDateRange=new Date()

    //Date before two weeks
    let startOfDateRange=new Date()
    startOfDateRange.setDate(endOfDateRange.getDate() - 14)
    console.log(startOfDateRange,endOfDateRange);

    //fetching project detailed info from database
    let result=await Project.findOne({where:{project_id:req.params.project_id,gdo:user.email,active:true},include:[
        {association:Project.Concerns,attributes:{exclude:["project_id","concern_id"]}},
        {association:Project.Employees,attributes:{exclude:["project_id"]}}],
        attributes:["project_name","client","client_account_manager","status","start_date","end_date","fitness_indicator","domain","project_type"]
    })
    
    //If project not found
    if(result==null)
    res.send({message:"Project not found"})

    //else

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
    // //sending response
    let team_members=result.employees.length+3
    result.dataValues.updates=projectUpdates
    result.dataValues.team_members=team_members
    //sending response
    res.send({messages:"Projects ",payload:result})
    }
    catch(err){
    }
})

//Resolve cocern
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

//Raise a resourcing request
exports.resourcingRequest=expressAsyncHandler(async(req,res)=>{
    //Assigning todays date
    req.body.date=new Date()
    //setting status to false
    req.body.status=false
    //add project
    
    try{
        let [bearer,token]=req.headers.authorization.split(" ")
        let result=jwt.verify(token,process.env.SECRET_KEY)
        req.body.project_id=req.params.project_id
        req.body.raised_by=result.email
        //posting data to database
        await ResourcingRequests.create(req.body)
        res.send({message:"Resourcing request created"})
    }
    catch(err){}
})
