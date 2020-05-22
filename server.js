// PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv/config');

// ROUTES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const userRoutes = require('./routes/users');
app.use('/', userRoutes);

// DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("Connected to Database")
);

const api = process.env.PORT; // send requests to this port
app.listen(api, () => { console.log(`Listening on port ${api}`)})