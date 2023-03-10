const expressAsyncHandler=require("express-async-handler")

//import bcryptjs
const bcryptjs=require("bcryptjs")

//import json web tokens
const jwt=require("jsonwebtoken")

//import User model
const {User}=require("../databse/models/user.model")

exports.test=(req,res)=>{
    res.send({message:"User API working fine"})
}

//Registration controller
exports.register=expressAsyncHandler(async(req,res)=>{
    //creating user by sending body of request
    await User.create(req.body)
    //sending response
    res.send({message:"User inserted sucessfully"})
})


//Login controller
exports.login=expressAsyncHandler(async(req,res)=>{
    let user=await User.findOne({where:{
        email:req.body.email
    }})
    //user not found - send response
    if(user==null || user.role==null)
    res.send({message:"Email id is not registered with us or contact super admin"})
    else{
        if(await bcryptjs.compare(req.body.password,user.password)){
            let signedToken=jwt.sign({email:req.email,role:user.role},process.env.SECRET_KEY)
            res.send({message:"Login sucess",token:signedToken})
        }
    }

})