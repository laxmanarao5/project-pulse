//import express-async-handler
const expressAsyncHandler = require("express-async-handler")

//import jwt
const jwt=require("jsonwebtoken")

//import dotenv
require("dotenv").config()

////////////////////////////   SMTP setup ////////////////////////////////////////////////

//import nodemailer
const nodemailer = require('nodemailer');

//create connection to smtp
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE_PROVIDER,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD // app password
  }
})

//import models
const {Concerns}=require("../databse/models/concerns.model")
const {Updates}=require("../databse/models/updates.model")
const {Project}=require("../databse/models/projects.model");
const { User } = require("../databse/models/user.model");

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
    // let date=new Date()
    // //add todays date to body
    // req.body.date=date
    //adding project id to body
    req.body.project_id=req.params.project_id
    //posting data into database
    await Updates.create(req.body)
    //sending response
    res.send({message:"Update created sucessfully"})
})

//Get all projects
exports.getAllProjects=expressAsyncHandler(async(req,res)=>{
  try{
      let [bearer,token]=req.headers.authorization.split(" ")
      let user=jwt.verify(token,process.env.SECRET_KEY)
      let result=await Project.findAll({where:{project_manager:user.email,active:true},attributes:["project_name","client","client_account_manager","status","start_date","end_date","fitness_indicator"]
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
  let result=await Project.findOne({where:{project_id:req.params.project_id,project_manager:user.email,active:true},include:[
      {association:Project.Updates,attributes:{exclude:["project_id","update_id"]}},
      {association:Project.Concerns,attributes:{exclude:["project_id","concern_id"]}},
  {association:Project.Employees,attributes:{exclude:["project_id"]}}],
      attributes:["project_name","client","client_account_manager","status","start_date","end_date","fitness_indicator","domain","project_type"]
  })
  let team_members=result.employees.length+3
  result.dataValues.team_members=team_members
  //sending response
  res.send({messages:"Projects ",payload:result})
  }
  catch(err){}
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

    //getting emails of admins
    let result=await User.findAll({where:{
        role:"admin"
    },attributes:["email"]
    })
    //fetching email of gdo
    let gdo=await Project.findOne({where:{
      project_id:req.params.project_id
    },attributes:["gdo"]})
    //converting array of object to array of emails
    let emails=result.map(user=>user.email)
    //creating comma seperated emails string
    emails=emails.reduce((email,bulkEmails)=>bulkEmails+","+email)
    //adding gdo email to emails
    emails=emails+","+gdo.gdo
    let mailOptions = {
        from: 'pulseproject006@gmail.com',
        to: emails,
        subject: 'New Concern raised',
        text: ` Concern :
        Raised_by : ${req.body.raised_by}
        Description : ${req.body.description}.
        Severity    : ${req.body.severity}.
        Raised by client : ${req.body.raised_by_client}.`
      }
    //send email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          
        }
      })
    //posting data into database
    await Concerns.create(req.body)

    //sending response
    res.send({message:"Concern created sucessfully"})
})