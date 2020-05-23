// PACKAGES
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();

//ROUTES 
const userRoutes = require('./routes/api/route');

// MIDDLEWARES
app.use(morgan('short'));
app.use(bodyParser.json());
app.use('/api', userRoutes);

// PORTS
const rest_api = process.env.PORT || 5000; 
app.listen(rest_api, () => { console.log(`Listening on port ${rest_api}`)})