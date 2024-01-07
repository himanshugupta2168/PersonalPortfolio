// the entire project details to be fed up here 
const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true ,
    },
    image_url:{
        type :String
    },
    techStack :[{
        type :mongoose.Schema.Types.ObjectId,
        ref:'TechStack'
    }],
    github_url:{
        type:String,
    },
    live_url:{
        type:String,
    },
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tag'
    }],
    description:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
});
module.exports= mongoose.model("Project", projectSchema);