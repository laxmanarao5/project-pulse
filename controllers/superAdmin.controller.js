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
    let updateCount=await User.update(req.body,{where:{
        email:req.params.user_email
    }})
    //send response
    res.send({message:"Role allocated sucessfully",updateCount:updateCount})
})

//Get all users to whom role is not at assigned
exports.not_assigned_users=expressAsyncHandler(async(req,res)=>{
    let result=await User.findAll({where:{
        role:null
    },attributes:{
        exclude:["password","role","createdAt","updatedAt"]
    }})
    //send response
    res.status(200).send({message:"Users are",payload:result})
})

//Get all users
exports.getUsers=expressAsyncHandler(async(req,res)=>{
    let result=await User.findAll({attributes:{
        exclude:["password","createdAt","updatedAt"]
    }},{where:{
        status:true
    }})
    //send response
    res.send({message:"Users are",payload:result})
})

//Delete user
exports.deleteUser=expressAsyncHandler(async(req,res)=>{
    let updateCount=await User.update({status:false},{where:{
        email:req.params.email
    }})
    if(updateCount!=0)
    res.send({message:"User deleted sucessfully"})
    else
    res.status(204).send({message:"User not found "})
})

//Delete user
exports.undoDeleteUser=expressAsyncHandler(async(req,res)=>{
    await User.update({status:true},{where:{
        email:req.params.email
    }})
    res.send({message:"User delete rollbacked"})
})