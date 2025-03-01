const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

dotenv.config()

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(PORT)
        console.log(`Server is running on port ${PORT}`)
    })
    .catch((err) => console.log(err));


// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);


