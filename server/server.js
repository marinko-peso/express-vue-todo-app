'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const signale = require('signale');

const app = express();
const config = require('./app/Config');

// Connect to database.
mongoose.connect(config.DB);

// Send static files from the client path directory.
app.use(express.static(path.join(__dirname, '/../client')));

// Use morgan to log request in dev mode.
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = config.APP_PORT || 4000;
app.listen(port);
signale.success('App listening on port: ', port);

const todoRoutes = require('./app/Routes');
// Use routes defined in Route.js and prefix it with api.
app.use('/api', todoRoutes);

app.use(function(request, response, next) {
  // Website to allow to connect.
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port);
  // Request methods to allow.
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers to allow.
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Pass to next middleware layer.
  next();
});

// Server index.html page when request to the root is made.
app.get('/', function(request, response, next) {
  response.sendfile('./../client/index.html');
});
