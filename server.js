// SERVER PACKAGES
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();

// AUTH PACKAGES
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const randomstring = require('randomstring');
const session = require('express-session');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);

// .env
require('dotenv').config(); 

//MISC
const userRoutes = require('./routes/api/route');
const random_string = randomstring.generate(12);

// MIDDLEWARES
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());

// DB SESSION CONNECTION
var options = {
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD, 
    database: 'tutorapp'
};

var sessionStore = new MySQLStore(options);

app.use(session({
    secret: random_string, 
    resave: false,
    store: sessionStore,
    saveUninitialized: true,
    // cookie: { secure : true }
}));
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use('/api', userRoutes);

// PORTS
const rest_api = process.env.PORT || 5000; 
app.listen(rest_api, () => { console.log(`Listening on port ${rest_api}`)});