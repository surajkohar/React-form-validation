//to run backend cmd>> node server.js
const express=require("express")
const app=express();
const cors=require("cors")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

app.use(cors())
app.use(express.json())        //bodyparser 

mongoose.set('strictQuery',false)    
mongoose.connect("mongodb://localhost:27017/newdatabase");

var UuserSchema=new mongoose.Schema({
    firstName:String,
    lname:String,
    password:String,
    email:String,
    phone:Number,
    gender:String,
    dateOfBirth:String,
});
const database=mongoose.model("userData",UuserSchema);

app.post("/insertData",async(req,res)=>{
    const post=req.body;
    //  console.log("post is",post)
    const user=new database();
    const hash=bcrypt.hashSync(post.password,12)
    user.firstName=post.firstName;
    user.lname=post.lastName;
    user.email=post.email;
    user.password=hash;
    user.dateOfBirth=post.dob;
    user.gender=post.gender;
    user.phone=post.phone;

    let doc=await user.save();
    res.send("doc is",doc)
})


app.listen(8000,()=>{
    console.log("server is running on port 8000")
})


