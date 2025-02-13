// controller actions

const User = require('../models/User')



module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const {username, password} = req.body;
    try{
        const user = await User.create({username, password})
        res.status(201).json(user);
    }catch (error){
        res.status(400).send("User not created")
    }
}

module.exports.login_post = async (req, res) => {
    const {username, password} = req.body;
    console.log(username, password)
    res.send('user login');
}