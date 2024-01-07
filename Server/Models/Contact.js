const mongoose = require("mongoose");
//   the entire details of the preson who filled the form 

const ContactSchema = new mongoose.Schema({
    fullName :{
        type: String, 
        required:true ,
    },
    email:{
        type :String, 
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    contacted:{
        type:Boolean, 
        default:false,
    }
},{
    timestamps:true,
})
module.exports = mongoose.model("Contact", ContactSchema);