let express = require("express")
let {signup,login, logout, refreshtoken} = require("../Controller/User.Controller")
let UserRouter = express.Router()



UserRouter.post("/signup",signup)
UserRouter.post("/login",login)
UserRouter.get("/logout",logout)
UserRouter.get("/refresh-token",refreshtoken)


module.exports = {UserRouter}