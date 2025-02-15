// controller actions

const User = require('../models/User')


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
        res.status(201).json(user);
    }catch (error){
        const errors = handleError(error);
        res.status(400).json({errors})
    }
}

module.exports.login_post = async (req, res) => {
    const {username, password} = req.body;
    console.log(username, password)
    res.send('user login');
}