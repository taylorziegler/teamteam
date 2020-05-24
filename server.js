// SERVER PACKAGES
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

// AUTH PACKAGES
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const randomstring = require("randomstring");
const session = require('express-session');
const passport = require('passport');

//.env
require('dotenv').config();

//ROUTES 
const userRoutes = require('./routes/api/route');

// MIDDLEWARES
let random_string = randomstring.generate(12);

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
    secret: random_string, 
    resave: false,
    saveUninitialized: true,
    // cookie: { secure : true }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', userRoutes);

// PORTS
const rest_api = process.env.PORT || 5000; 
app.listen(rest_api, () => { console.log(`Listening on port ${rest_api}`)});