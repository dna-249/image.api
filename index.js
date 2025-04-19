
const express  = require("express");
const Port = process.env.PORT || 3000
const app = express()
const cors = require("cors");
const multer = require("multer");


const corsConfig = {
    origin : ["https://cloud-school-lifecamp.vercel.app"],
    credential : true,
    methods : ["GET","POST","PUT","DELETE"],
    headers:["*"]
}

app.options("",cors(corsConfig))
app.use(cors(corsConfig))
app.use(express.json())

const storage = multer.diskStorage({ destination : "image/",
    filename:(req, file, cb)=> {
cb(null, `${file.originalname}`)
}})
app.use("/file", express.static("image/"))
const upload = multer({storage:storage})



app.get("/",(req,res)=>{
    res.send("hello from backend")
})


app.post('/image',upload.single("file"),(req,res) => {
    console.log(req.file)             
})


app.listen(Port, ()=>{
    console.log("server is Running")
    
})