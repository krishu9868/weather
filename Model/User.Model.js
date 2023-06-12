let mongoose = require("mongoose")

let UserSchema = mongoose.Schema({

    email : {type: String , required: true, unique:true},
    password:{type: String, required: true}
})


let UserModel = mongoose.model("UserInfo",UserSchema)


module.exports = {UserModel}