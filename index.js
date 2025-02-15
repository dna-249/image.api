
const express = require("express");
const port = process.env.port || 3000
require("dotenv").config()
const cors = require("cors");
const bodyParser = require("body-parser");
const  upload = require("./cloudinary/upload");



const app = express()
const corsConfig = {
    origin :["*"],
    credential : true,
    methods : ["GET","POST","PUT","DELETE"]
}

app.use(cors(corsConfig))

app.use("/file",express.static("cloud/"))
app.get("/",(req,res)=>{
    res.send("hello world")
})

app.post("/post",upload.single("file"),(req,res)=>{
    console.log(req.file)
    
})




app.listen(port,()=>{
    console.log("server is listening")
})