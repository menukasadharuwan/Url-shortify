require("dotenv").config()

const mongoose = require("mongoose")

const dbconnect = async() =>{
    try{
    const db = await mongoose.connect(process.env.mongodb_url);
    console.log("Db connect successfull.")
    }
    catch(error){
        console.log("Error" + error.message)
    }
}

module.exports = dbconnect;
