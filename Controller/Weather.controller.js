let axios = require("axios")
let {redis} = require("../redis.db")
let {winstonLogger} = require("../Middleware/Winston")
require("dotenv").config()
let getWeather = async(req,res)=>{

    
        const {city} = req.query
        const existData = await redis.get(`${city}`)
        console.log(existData)
        try{
       if(existData!==null ){

         res.send(JSON.parse(existData))
       }else{
       
        const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.apiKey}`,(err,result)=>{
            if(err){
                res.send(err)
                winstonLogger.error("not gettting data")
            }
        })
       
        console.log(data)
        await redis.set(`${city}`,`${JSON.stringify(data)}`)

        res.send({data})
       }
    }catch(err){
        res.send(err)
        winstonLogger.error("not gettting data")
    }
    
}


module.exports = {getWeather}