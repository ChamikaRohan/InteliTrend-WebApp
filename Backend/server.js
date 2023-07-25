const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const multer = require('multer');
require("dotenv").config();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


const upload = multer({ dest: 'uploads/' }); // specify the directory where files will be uploaded

app.use(bodyParser.json());
app.use(cors());
const regRoutes = require("./routes/Registration")
app.use(regRoutes);

const docRoutes = require("./routes/Doctor")
app.use(docRoutes);

const PORT = process.env.PORT ||8000;
const URL = process.env.DB;

mongoose.connect(URL)
 .then(()=>{
    console.log("Connected")
 })

 .catch((err)=>{
    console.log('DB error',err)
 })


app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`);
});