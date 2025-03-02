// controller actions

const User = require('../models/User')
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config()

// Hanle errors
const handleError = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', password: '', username:''}

    //duplicate error
    if(err.code === 11000){
        errors.email = 'This email is already registered.';
        errors.username = 'This username is already exist. Try with other one.'
        return errors;
    }

    //validate error
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            // console.log(properties)
            errors[properties.path] = properties.message;
        })
    }
    return errors
}

// Creating a time variable for expiry of token.
const maxAge = 24 * 60 * 60;

// Function for creating Token for authorization.
const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn: maxAge
    })
}



module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const {email, username, password} = req.body;
    try{
        const user = await User.create({email, username, password})
        
        // Creating token and storing them in cookies for refference of future use.
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})

        res.status(201).json({user: user._id});
    }catch (error){
        const errors = handleError(error);
        res.status(400).json({errors})
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;

    try{
        const authUser = await User.login(email,password);
        res.status(200).json({user: authUser._id})

    }catch(err){
        res.status(400).json({})
    }

    console.log(email, password)
    res.send('user login');
}