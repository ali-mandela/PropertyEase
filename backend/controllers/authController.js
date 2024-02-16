const userModel = require('../models/userModel');
const bcryptjs = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/error');
const {json} = require('express');
const signUpController = async(req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new userModel({username, email, password: hashedPassword});
    try {
        await newUser.save();
        res
            .status(201)
            .json({message: "user created succesfully", success: true})

    } catch (error) {
        next(error)
    }

}

const signInController = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const validUser = await userModel.findOne({email});
        if (!validUser) {
            return next(errorHandler(404, 'user not found.'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(401, 'wrong credentials.'))
        }
        const {
            password: pass,
            ...rest
        } = validUser._doc;
        const token = jwt.sign({
            _id: validUser._id
        }, process.env.JWT_SCRET);
        res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(rest)

    } catch (error) {
        next(error)
    }

}

const oAuthController = async(req, res, next) => {
    try {
        const {email, name, photo} = req.body;
        
        const user = await userModel.findOne({email});
        if (user) {
            const {
                password: pass,
                ...rest
            } = user._doc;
            const token = jwt.sign({
                _id: user._id
            }, process.env.JWT_SCRET);
            res
                .cookie('access_token', token, {httpOnly: true})
                .status(200)
                .json(rest)

        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const username =name.split('.').join("").toLowerCase() + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = new userModel({username, email, password: hashedPassword, photo});
            await newUser.save()
            const {
                password: pass,
                ...rest
            } = newUser._doc;
            const token = jwt.sign({
                _id: newUser._id
            }, process.env.JWT_SCRET);
            res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(rest)
        }
        // if (validUser) {     return next(errorHandler(404, 'user not found.')) }
        // const validPassword = bcryptjs.compareSync(password, validUser.password) if
        // (!validPassword) {     return next(errorHandler(401, 'wrong credentials.')) }
        // const {password : pass, ...rest} = validUser._doc; const token =
        // jwt.sign({_id: validUser._id}, process.env.JWT_SCRET);
        // res.cookie('access_token', token,{ httpOnly : true}).status(200).json(rest)

    } catch (error) {
        next(error)
    }

}

// oAuthController
module.exports = {
    signUpController,
    signInController,
    oAuthController
}