const expressAsyncHandler = require("express-async-handler")
const { User } = require("../databse/models/user.model")


exports.test=(req,res)=>{
    res.send({message:"Superadmin API working fine"})
}

exports.allocate=expressAsyncHandler(async(req,res)=>{
    User.update(req.body,{where:{
        email:req.params.user_email
    }})
    res.send({message:"Role allocated sucessfully"})
})

exports.not_assigned_users=expressAsyncHandler(async(req,res)=>{
    let result=await User.findAll({where:{
        role:null
    },attributes:{
        exclude:["password","role","createdAt","updatedAt"]
    }})
    res.send({message:"Users are",payload:result})
})