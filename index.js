
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

const storage = multer.diskStorage({ destination : "upload/",
    filename:(req, file, cb)=> {
cb(null, `${file.originalname}`)
}})
app.use("/file", express.static("upload"))
const upload = multer({storage:storage})


app.get('/file/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'upload', filename); // Assuming your images are in an 'uploads' directory

  res.sendFile(filePath, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found (404)
        res.status(404).type('text/plain').send('File not found');
        // Alternatively, for a JSON response:
        // res.status(404).json({ error: 'File not found' });
      } else {
        // Other errors
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    } else {
      // Successful file retrieval
      // For JPEG:
      res.type('image/jpeg'); 
      // For other image types:
      // res.type('image/png');
      // res.type('image/gif');
      // ...
    }
  });
});

// ... other routes and server startup ...


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