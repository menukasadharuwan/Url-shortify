const mongoose = require("mongoose");

const urlschema = mongoose.Schema({
    originalUrl : String,
    shortCode : String,
    date:{
        type: Date,
        default: Date.now
    }
    }
);

module.exports = mongoose.model("url",urlschema);
