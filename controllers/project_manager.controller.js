//import express-async-handler
const expressAsyncHandler = require("express-async-handler")

//import models
const {Concerns}=require("../databse/models/concerns.model")
const {Updates}=require("../databse/models/updates.model")
const {Project}=require("../databse/models/projects.model")

//Associations
Project.Updates=Project.hasMany(Updates,{foreignKey:"project_id"})
Project.Concerns=Project.hasMany(Concerns,{foreignKey:"project_id"})

//Controllers

//test controller
exports.test=(req,res)=>{
    res.send({message:"Project manager API working fine"})
}

//project updates
exports.updates=expressAsyncHandler(async(req,res)=>{
    let date=new Date()
    //add todays date to body
    req.body.date=date
    //adding project id to body
    req.body.project_id=req.params.project_id
    //posting data into database
    await Updates.create(req.body)
    //sending response
    res.send({message:"Update created sucessfully"})
})

//project concerns
exports.concern=expressAsyncHandler(async(req,res)=>{
    let date=new Date()
    //add todays date to body
    req.body.raised_date=date
    //raised by - is taken from token
    req.body.project_id=req.params.project_id
    req.body.raised_by="laxman"
    //setting initializing status to raised
    req.body.status="raised"
    //posting data into database
    await Concerns.create(req.body)
    //sending response
    res.send({message:"Concern created sucessfully"})
})