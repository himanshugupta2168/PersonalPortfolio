const express = require("express");
const app = express();
const zod = require("zod");
const mongoose = require("mongoose");
require("dotenv").config();
const { adminMiddleware } = require("./middleware");
const db = require("./DbConnect");
const port = process.env.PORT;
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Cloudinary=require("./Cloudinary")
const fileUplaod = require("express-fileupload")
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser")
const cors = require("cors");



// zod vaildation schema
const emailSchema = zod.string().email();
const PasswordSchema = zod.string().min(8);

//  models
const Admin = require("./Models/Admin");
const Contact = require("./Models/Contact");
const TechStack = require("./Models/TechStacks");
const Project= require("./Models/ProjectModel")
const Tag= require("./Models/TagModel")

app.use(express.json());
app.use(fileUplaod({
  useTempFiles:true,
  tempFileDir:"/tmp/"
}
))

app.use(cors());

//  cloudianry extra functions 
// image upload to cloud 
function checkSupported(fileType , supportedTypes){
  return supportedTypes.includes(fileType);
}
async function uploadFileToCloudinary(file, folder) {
  try {
    const options = { folder, resource_type: "auto" };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    throw new Error("Error uploading file to Cloudinary");
  }
}
app.post("/publish", adminMiddleware, async (req, res) => {
  //  to add projects
  try{
    const { title, techstack, github_url, live_url, tags, description } = req.body;
    const file = req.files.image;
    const supportedType=["jpeg", "png", "jpg"];
    const fileType = file.name.split('.').pop().toLowerCase();  
    if (!checkSupported(fileType, supportedType)){
      return res.status(415).json({
        msg:"Unsupported file type",
        success :false,
      });
    }
    else{
      const response =await  uploadFileToCloudinary(file, "Portfolio/Projects");

      const savedData = await Project({
        // your other Project properties...
        title:title,
        github_url:github_url,
        live_url:live_url,
        description:description,
        techStack: [],
        tags: [],
        image_url:response.secure_url,
      });
      
      const techStackUrls = techstack.split(',');
      const tagUrls = tags.split(',');
      
      // Function to create or find a TechStack document based on words==urls
      const createOrFindTechStack = async (url) => {
        let techStackDoc = await TechStack.findOne({ title:url });
        if (!techStackDoc) {
          techStackDoc = await TechStack.create({title:url});
        }
        return techStackDoc._id;
      };
      
      // Function to create or find a Tag document based on words===urls
      const createOrFindTag = async (url) => {
        let tagDoc = await Tag.findOne({ tagName:url });
        if (!tagDoc) {
          tagDoc = await Tag.create({tagName: url});
        }
        return tagDoc._id;
      };
      
      // Process techstack URLs
      for (const url of techStackUrls) {
        const techStackId = await createOrFindTechStack(url);
        savedData.techStack.push(techStackId);
      }
      
      // Process tags URLs
      for (const url of tagUrls) {
        const tagId = await createOrFindTag(url);
        savedData.tags.push(tagId);
      }
      
      // Save the updated Project document with associated TechStack and Tag IDs
      await savedData.save();
      
      // Response with the savedData, including associated TechStack and Tag IDs
      return res.status(200).json({
        msg: "Project created successfully",
        data: savedData,
      });
      
    }

  }
  catch(err){
    return res.status(500).json ({
      msg:"Internal Server Error ",
      error:err.message,
    })

  }
});
app.get("/projects", async (req, res) => {
  //  to get entire projects
  try{
        const response = await Project.find({}).populate('techStack tags').exec();
        return res.status(200).json({
            msg:"Projects fetched Successfully",
            data : response,
        })
    }
catch(err){
    return res.status(500).json({
        msg:"Internal Server error ",
        error : err.message,
    })
    
    }
});

app.get("/techs", async (req, res) => {
  try {
    const response = await TechStack.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      msg: "Tech Stacks fetched Successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Internal Server error",
      error: err.message,
    });
  }
});

app.post("/techstack", async (req, res) => {
  //  to enter a new tech stack
  try {
    const { title, description, stackType, highlight } = req.body;
    let file = null;

    if (req.files && req.files.image) {
      file = req.files.image;

      const supportedTypes = ["jpeg", "png", "jpg"];
      const fileType = file.name.split('.').pop().toLowerCase();
      if (!checkSupported(fileType, supportedTypes)) {
        return res.status(415).json({
          msg: "Unsupported file type",
          success: false,
        });
      }
    }

    let response = null;
    if (file) {
      response = await uploadFileToCloudinary(file, "Portfolio/TechStacks");
    }
    const savedData = await TechStack.create({
      title: title,
      imageUrl:response!=null?response.secure_url:null,
      description: description,
      stackType: stackType,
      highlight: highlight,
    });

    return res.status(201).json({
      msg: "Tech Stack added Successfully",
      data: savedData,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Internal Server error",
      error: err.message,
    });
  }
});

app.post("/contactviaform", async (req, res) => {
  // to post data about contact the client
  try {
    await Contact.create(req.body);
    return res.status(201).json({
      msg: "Message Sent Successfully",
      success:true,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Internal Server Error",
      success:false,
      error: err.message,
    });
  }
});
app.get("/toContact", async (req, res) => {
  //  to diplayed all pwrsons who filled the form n
  try {
    const response = await Contact.find({});
    return res.status(200).json({
      msg: "Contacts fetched Successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Internal Server Error ",
      error: err.message,
    });
  }
});
app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    // Validate email and password using zod schemas with safeParse
    const emailParseResult = emailSchema.safeParse(username);
    const passwordParseResult = PasswordSchema.safeParse(password);

    if (emailParseResult.success && passwordParseResult.success) {
      const zodValidatedEmail = emailParseResult.data;
      const zodValidatedPassword = passwordParseResult.data;

      // Find admin by username (email)
      const admin = await Admin.findOne({ username: zodValidatedEmail });
      if (!admin) {
        throw new Error("Admin not found");
      }

      // Compare hashed password
      const passwordMatch = await bcrypt.compare(
        zodValidatedPassword,
        admin.password
      );
      if (passwordMatch) {
        // Generate JWT token
        const token = JWT.sign(
          { email: zodValidatedEmail },
          process.env.JWT_SECRET
        );
        return res.status(200).json({
          msg: "Token generation successful",
          token: token,
        });
      } else {
        throw new Error("Incorrect password");
      }
    } else {
      throw new Error("Invalid email or password format");
    }
  } catch (err) {
    return res.status(401).json({
      msg: "Error in logging into the server",
      error: err.message, // Be careful about exposing detailed error messages
    });
  }
});

app.get("/", async (req, res) =>{
  try{
    const response = await Admin.find({}).select("-password -username -_id");
    return res.status(200).json({
      success:true,
      msg:"Admin data fetched Successfully",
      data:response,
    })

  }
  catch(err){
    return res.status(500).json({
      success:false,
      msg:"Internal Server Error",
      error: err
    })
  }
  const response = await Admin.find({}).select("-password -username")
  return res.json(response)
});
//  use the below one onmly to create admin
app.post("/postt", async (req, res) => {
  const { username, password } = req.body;
  await Admin.create({
    username: username,
    password: password,
  });
  return res.json("Admin account created Successfully ");
});

app.use((err, req, res, next) => {
  if (err) {
    return res.redirect("/");
  }
});
app.listen(port, (err) => {
  if (err) {
    console.log("error in starting the server ", err);
  }
});
db.connect();
Cloudinary.cloudinaryConnect();



/*

 */