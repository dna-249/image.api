
const express  = require("express");
const Port = process.env.PORT || 3000
const app = express()
const cors = require("cors");
const multer = require("multer");





app.use(cors())
app.use(express.json())

const storage = multer.diskStorage({ destination : "uploads/image",
    filename:(req, file, cb)=> {
cb(null, `${file.originalname}`)
}})
app.use("/file", express.static("uploads/image"))
const upload = multer({storage:storage})



app.get("/",(req,res)=>{
    res.send("hello from backend")
})


app.post('/api/users',upload.single("file"),(req,res) => {
    
                    
})


app.listen(Port, ()=>{
    console.log("server is Running")
    
})