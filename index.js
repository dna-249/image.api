
const express  = require("express");
const Port = process.env.PORT || 3000
const app = express()
const cors = require("cors");
const multer = require("multer");


const corsConfig = {
    origin : ["https://cloud-database.vercel.app"],
    credential : true,
    methods : ["GET", "POST","PUT", "DELETE", "PATCH", "OPTIONS"],
    headers:["*"]
}

app.options("",cors(corsConfig))
app.use(cors(corsConfig))
app.use(express.json())

const storage = multer.diskStorage({ destination : "profileImage/",
    filename:(req, file, cb)=> {
cb(null, `${file.originalname}`)
}})
app.use("/cloud", express.static("profileImage/"))
const upload = multer({storage:storage})



app.get("/",(req,res)=>{
    res.send("hello from backend")
})


app.post('/image',upload.single("cloud"),(req,res) => {
    try {
        res.status(200).json("uploaded successfully")  
    } catch (error) {
        res.status(500).json(error.message) 
    }
               
})


app.listen(Port, ()=>{
    console.log("server is Running")
    
})