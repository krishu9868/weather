let express = require("express")
let cookieParse = require("cookie-parser")
let {connection} = require("./db")
let {UserRouter} = require("./Routers/user.router")
let {Weatherrouter} = require("./Routers/Weather.router")
let {authentication} = require('./Middleware/authenticate')
let {limiter} = require('./Req.Rate.limit')
require("dotenv").config()

let app = express()

app.use(express.json())
app.use(cookieParse())

app.get("/",(req,res)=>{

    res.send({msg: "Welcome"})
})

app.use("/User",UserRouter)

app.use(authentication)
app.use(limiter)
app.use("/Weather",Weatherrouter)

app.listen(process.env.port,()=>{

    try{

        connection
        console.log("mongodb is running")

    }catch(err){

        console.log(err)

    }

    console.log("server is running")

})