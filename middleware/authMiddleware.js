const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const User = require('../models/User');

dotenv.config()

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check wether json web token exist in cookies or not!
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.redirect('/login');
            }
            else {
                console.log(decodedToken)
                next();
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = null
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;    // Make the user accessible inside the views.
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }

}


module.exports = { requireAuth, checkUser }



