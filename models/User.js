const mongoose = require('mongoose');
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Please enter the email"],
        unique: true,
        validate: [isEmail, "Please enter the valid email."]
    },
    username:{
        type: String,
        required: [true, "Please enter the username"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please enter the password"],
        minLength: [4, "Minimum length should be 4 characters."]
    }
})

const User = mongoose.model("user", userSchema)

module.exports = User;

