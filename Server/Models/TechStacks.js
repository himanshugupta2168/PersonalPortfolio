// this will contain all the miage of the techs used in the project 
const mongoose = require("mongoose");

const TechSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String, 
    },
    description:{
        type:String,
        // required:true,
    },
    stackType:{
        type:String, 
        enum :["Frontend", "Backend","DatabaseManagement", "Language", "Other" ],
    },
    highlight:{
        type:Boolean,
        default:false,
    }
}, {
    timestamps:true,
})
module.exports= mongoose.model("TechStack", TechSchema);