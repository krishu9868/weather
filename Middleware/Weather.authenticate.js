let Weatherauthentication = async (req,res,next)=>{

    let city = req.query.city

    console.log(city)

    const validCityRegex = /^[a-zA-Z\s]+$/;

    if(validCityRegex.test(city) && city){

        next()

    }else{

        res.status(500).send("city  is not valid")
    }

}


module.exports = {Weatherauthentication}