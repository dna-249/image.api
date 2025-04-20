
const express  = require("express");
const Port = process.env.PORT || 3000
const app = express()
const cors = require("cors");
const multer = require("multer");
const path = require('path');


const corsConfig = {
    origin : ["https://cloud-database.vercel.app"],
    credential : true,
    methods : ["GET", "POST","PUT", "DELETE", "PATCH", "OPTIONS"],
    headers:["*"]
}

app.options("",cors(corsConfig))
app.use(cors(corsConfig))
app.use(express.json())

const storage = multer.diskStorage({ destination : "upload/images",
    filename:(req, file, cb)=> {
cb(null, `${file.originalname}`)
}})

const upload = multer({storage:storage})



   

    app.use(express.static('public'))

   app.get('/file/:filename', (req, res) => {
     const filename = req.params.filename;
     const filePath = path.join(__dirname, 'public', 'images', filename); // Corrected path

     res.sendFile(filePath, (err) => {
       if (err) {
         if (err.code === 'ENOENT') {
           res.status(404).type('text/plain').send('File not found');
         } else {
           // ... other error handling ...
         }
       } else {
         const contentType = mime.getType(filePath) || 'application/octet-stream';
         res.setHeader('Content-Type', contentType);
       }
     });
   });

   // ...
app.post('/image',upload.single("upload"),(req,res) => {
    try {
        res.status(200).json("uploaded successfully")  
    } catch (error) {
        res.status(500).json(error.message) 
    }
               
})


app.listen(Port, ()=>{
    console.log("server is Running")
    
})