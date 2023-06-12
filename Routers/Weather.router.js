let express = require('express')
let {getWeather} = require('../Controller/Weather.controller')
let {Weatherauthentication} = require('../Middleware/Weather.authenticate')
let Weatherrouter = express.Router()


Weatherrouter.get("/",Weatherauthentication,getWeather)


module.exports = {Weatherrouter}