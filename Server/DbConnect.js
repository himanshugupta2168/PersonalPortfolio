const mongoose = require("mongoose")
exports.connect = ()=>{
    mongoose.connect(process.env.MONGO_DB)
    .then(console.log("db connection successfull"))
    .catch(
        (err)=>{
            console.log("error in connecting to the database ", err);
            process.exit(1);
        }
    )
}
