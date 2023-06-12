let {MongoDB}= require("winston-mongodb")
let winston = require("winston")
require("dotenv").config()
winstonLogger = winston.createLogger({
    transports:[
      
        new winston.transports.MongoDB({
            db:process.env.mongodb,
            options:{useUnifiedTopology:true},
            collection : "logs",
            level: "error"
        }),
      
    ],
    format:winston.format.prettyPrint()
})







  module.exports = {winstonLogger}
  

