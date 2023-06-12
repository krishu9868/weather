let express = require('express')
let {UserModel} = require("../Model/User.Model")
let {winstonLogger} = require("../Middleware/Winston")
let {redis} = require("../redis.db")
let bcrypt = require("bcrypt")
let JWT = require("jsonwebtoken")
require("dotenv").config()

let signup = async (req,res)=>{

    let {email,password} = req.body

    bcrypt.hash(password,8, async(err,hash)=>{
        if(err){

           winstonLogger.error("something wrong in user password")

           return res.status(500).send({err:"error"})
        
        }else{

           if(await UserModel.insertMany([{email:email,password:hash}])){

            res.send({msg: "signup Success"})

           }else{

        winstonLogger.error("login failed")

           return res.status(500).send({msg:err.message})

           }
       


  }})
    
}

let login = async(req,res)=>{

    let {email,password} = req.body
   
    let IsExist = await UserModel.find({email:email})
    
   
   

    if(IsExist.length == 0){

        winstonLogger.error("user doesn't exist")

      return  res.status(500).send({msg:"Not Signup"})

    }else{

      let token =  JWT.sign({email:email},process.env.Private_key)
        

      let refresh =  JWT.sign({email:email},process.env.Refresh_key)

        redis.set(`token`,token,"EX",60*9)

        redis.set('Refreshtoken',refresh,"EX",60*12)

        res.send("login success")
    }
}

let logout = async (req,res) =>{

   
    
    let token = await redis.get(`token`)
    let refreshtoken = await redis.get(`Refreshtoken`)
    console.log(token)
    if(token!==null && refreshtoken!==null){

        redis.del(`token`)
        redis.del(`Refreshtoken`)
        res.send("logout success")

    }else{

        winstonLogger.error("not login")

        res.status(500).send("not login")
    }
    

}

let refreshtoken = async(req,res)=>{

    let refresh =  JWT.sign({email:email},process.env.Refresh_key)

    redis.set('Refreshtoken',refresh,"EX",60*12)

 
    res.send({msg:"Got it refreshtoken"})


}
module.exports = {signup,login,logout,refreshtoken}
