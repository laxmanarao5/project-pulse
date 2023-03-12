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
const { Employees } = require("../databse/models/employees.model")

//Associations
Project.Employees=Project.hasMany(Employees,{foreignKey:"project_id"})

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
        let result=await Project.findAll({where:{gdo:user.email},attributes:["project_name","client","client_account_manager","status","start_date","end_date","fitness_indicator"]
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
    let result=await Project.findAll({where:{project_id:req.params.project_id,gdo:user.email},include:[
        {association:Project.Updates,attributes:{exclude:["project_id","update_id"]}},
        {association:Project.Concerns,attributes:{exclude:["project_id","concern_id"]}},
    {association:Project.Employees,attributes:{exclude:["project_id"]}}],
        attributes:["project_name","client","client_account_manager","status","start_date","end_date","fitness_indicator","domain","project_type"]
    })
    //sending response
    res.send({messages:"Projects ",payload:result})
    }
    catch(err){}
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

