
let JWT = require("jsonwebtoken")
let {redis} = require('../redis.db')
let {winstonLogger} = require('../Middleware/Winston')
require('dotenv').config()



let authentication = async(req,res,next)=>{

    let token = await redis.get('token')
    let refresh = await redis.get('Refreshtoken')
//console.log(token,refresh)
    if(token!=null && refresh!=null){
        next()
    }else{
        winstonLogger.error("token invalid")

        res.status(505).send({msg:"unauthorized"})
    }
}

    

    
      
    
    



module.exports = {authentication}