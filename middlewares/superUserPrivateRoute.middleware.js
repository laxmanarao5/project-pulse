//import dotenv
require("dotenv").config()

//import jwt
const jwt=require("jsonwebtoken")

exports.superUSerPrivateRoute=(req,res,next)=>{
    console.log(req.headers.authorization);
    if(req.headers.authorization!=undefined)
    {
        let [bearer,token]=req.headers.authorization.split(" ")
        try{
            //verifying jwt token
           let result=jwt.verify(token,process.env.SECRET_KEY)
            //if valid token send req to next middleware else generate an error
            next()
        }
        catch{
            //if error occured means token expired
            res.send({message:"Token expired Relogin"})
        }
    }
    else
    {
        res.send({message:"Unauthorized request"})
    }
}