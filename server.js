const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const shortid = require("shortid");
const dbconnect = require("./models/db");
const urlShorten = require("./models/url");
require("dotenv").config()

console.log(process.env.server_url)

//make express app and setup
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//db connect
dbconnect();

//get original url and save it database
app.post("/url", async (req, res) => {
    //get data in frontend
    const { original } = req.body;
    console.log(original)
    //validation
    if (!original) {
        return res.status(400).json({
        status: "false",
        message: "Url not found",
        });
    }


    //generater shortid
    const shortID = shortid.generate();

    //new schema
    const urlData = new urlShorten({
        originalUrl: original,
        shortCode: shortID,
    });

    //save data in the database
    try {
        await urlData.save();
    } catch {
        console.log("Error insert data .");
    }

    res.json({
        status: true,
        message: "message arrived success!",
        url : process.env.server_url+shortID
    });
});


//.........................

//redirect route

app.get("/:code",async(req,res)=>{
    try{
        //find shortcode
        const findUrl = await urlShorten.findOne({shortCode : req.params.code});

        if(findUrl){
            console.log(findUrl.originalUrl)
            return res.redirect(findUrl.originalUrl);
        }else{
            return res.send("Url not Found 404!")
        }
    }
    catch{
        console.log("Url find error")
    }
})

//server run
app.listen(3000, () => {
  console.log("Server is running..");
});
