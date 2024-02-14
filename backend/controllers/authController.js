const userModel = require('../models/userModel');
const bcryptjs = require('bcrypt');
const errorHandler = require('../utils/error')

const signUpController=async (req,res, next)=>{
    const {username, email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new userModel({username ,email, password : hashedPassword});
    try{  
        await newUser.save();
        res.status(201).json({
            message:"user created succesfully",
            success: true
        })

    }catch(error){
      next(error)

    }
  

}

module.exports = {signUpController}