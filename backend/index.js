const express = require('express');
const DbConnect = require('./dbConfig/DB');
const dotenv = require("dotenv").config();
const app = express();

DbConnect();

const port = process.env.port || 8080;

app.listen(port,()=>{
    console.log(`server is live on port : ${port}`);

})

