//import express-async-handler
const expressAsyncHandler = require("express-async-handler")

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
    console.log(emails);
    //send email
    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
          
    //     }
    //   })
    //posting data into database
    await Concerns.create(req.body)

    //sending response
    res.send({message:"Concern created sucessfully"})
})