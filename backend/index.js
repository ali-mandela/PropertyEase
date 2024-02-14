const express = require('express');
const DbConnect = require('./dbConfig/DB');
const dotenv = require("dotenv").config();
const app = express();

DbConnect();
app.use(express.json())


// routes
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/auth', require('./routes/authRoute'));

const port = process.env.port || 8080;

app.listen(port, () => {
    console.log(`server is live on port : ${port}`);

})

app.use((err, req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})