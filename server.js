// PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv/config');

//ROUTES 
const userRoutes = require('./routes/users');

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/', userRoutes);

// DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("Connected to Database")
);

// PORTS
const api = process.env.PORT || 5000; 
app.listen(api, () => { console.log(`Listening on port ${api}`)})