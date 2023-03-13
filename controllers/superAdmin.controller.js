//import express-async-handler
const expressAsyncHandler = require("express-async-handler")

//import model
const { User } = require("../databse/models/user.model")

//Test controller
exports.test=(req,res)=>{
    res.send({message:"Superadmin API working fine"})
}

//Role assignment
exports.allocate=expressAsyncHandler(async(req,res)=>{
    User.update(req.body,{where:{
        email:req.params.user_email
    }})
    res.send({message:"Role allocated sucessfully"})
})

//Get all users to whom role is not at assigned
exports.not_assigned_users=expressAsyncHandler(async(req,res)=>{
    let result=await User.findAll({where:{
        role:null
    },attributes:{
        exclude:["password","role","createdAt","updatedAt"]
    }})
    res.send({message:"Users are",payload:result})
})

//Get all users
exports.getUsers=expressAsyncHandler(async(req,res)=>{
    let result=await User.findAll({attributes:{
        exclude:["password","role","createdAt","updatedAt"]
    }})
    res.send({message:"Users are",payload:result})
})