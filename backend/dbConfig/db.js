const mongoose = require("mongoose");


const DbConnect = async() =>{
    try{

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`database connected : ${conn.connection.host}`);

    }catch(error){
        console.log(error.message);
    }

   

}

module.exports = DbConnect;