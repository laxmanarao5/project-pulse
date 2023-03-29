const expressAsyncHandler=require("express-async-handler")

//import bcryptjs
const bcryptjs=require("bcryptjs")

require("dotenv").config()

//import json web tokens
const jwt=require("jsonwebtoken")

//import User model
const {User}=require("../databse/models/user.model")

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

//Creating otps object
let otps={}

exports.test=(req,res)=>{
    res.send({message:"User API working fine"})
}

//Registration controller
exports.register=expressAsyncHandler(async(req,res)=>{
    
    try{
        //creating user by sending body of request
        await User.create(req.body)
        //sending response
        res.status(201).send({message:"User inserted sucessfully"})
    }
    catch(err){
        //sending response
        res.send({message:"User with email id already exists,contact admin of the application"})
    }
    
})


//Login controller
exports.login=expressAsyncHandler(async(req,res)=>{
    let user=await User.findOne({where:{
        email:req.body.email,
        status:true
    }})
    //user not found - send response
    if(user==null || user.role==null)
    res.status(200).send({message:"Email id is not registered with us or contact super admin"})
    //user found
    else{
        //compare password with password stored in db
        if(await bcryptjs.compare(req.body.password,user.password)){
            //generate token
            user=user.toJSON()
            delete user.password
            delete user.status
            delete user.user_id
            let signedToken=jwt.sign(user,process.env.SECRET_KEY)
            console.log(user);
            //send token along with response
            res.send({message:"success",token:signedToken,user:user})
        }
        else{
            res.status(200).send({message:"Invalid Password"})
        }
    }

})

//Forget password

exports.forgetpassword=expressAsyncHandler(async(req,res)=>{
    //generating 6 digit random number as otp
    let otp=Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    //add OTP to otps
    otps[req.body.email]=otp
    //draft email
    let mailOptions = {
        from: 'pulseproject006@gmail.com',
        to: req.body.email,
        subject: 'OTP to reset password for project pulse',
        text: `Hi ,
         We received a request to reset yout project pulse password .Enter the following OTP to reset password :  
          `+otp
      }
    //send email
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          
        }
      })
    //setting validity to OTP
    setTimeout(()=>{
        //delete OTP from object
        delete otps[req.body.email]
    },600000)
    res.send({message:"OTP to reset your password is sent to your email"})    
})


//reset password

exports.resetPassword=expressAsyncHandler(async(req,res)=>{
    //otp matches
    if(req.body.otp==otps[req.params.email]){
        console.log("password verififed");
       let updateCount= await User.update({password:req.body.password},{where:{
            email:req.params.email
        }})
        console.log(updateCount);
        res.send({message:"Password reset sucessfully"})
    }
    else{
        res.send({message:"Invalid OTP"})
    }
})


exports.getAllManagementEmployees = expressAsyncHandler(async(req,res)=>{
    let gdoResult = await User.findAll({where:{
        role:"gdo"
    },attributes:{
        include:["email"]
    }})
    let pmResult = await User.findAll({where:{
        role:"project_manager"
    },attributes:{
        include:["email"]
    }})

    res.send({gdo:gdoResult,pm:pmResult})
})
