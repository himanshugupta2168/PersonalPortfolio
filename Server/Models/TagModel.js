//  this will contain the netire tags for the projects
const mongoose= require("mongoose");

const TagSchema = new mongoose.Schema({
    tagName:{
        type:String,
    }
});
module.exports= mongoose.model("Tag", TagSchema);