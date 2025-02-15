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

// fire a function after user document saved to DB. 
userSchema.post('save', function(doc, next) {
    console.log('New user was created.',doc);
    // next()
})

// fire a function before user document saved to DB.
userSchema.pre('save', function(next){
    console.log('User about to created and saved', this)
    next();
})


const User = mongoose.model("user", userSchema)

module.exports = User;

