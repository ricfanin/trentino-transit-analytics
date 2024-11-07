// Importing required modules
const cors = require('cors');
const express = require('express');
const sessionMiddleware = require('./middleware/session_auth.js');

// parse env variables
require('dotenv').config();

require("./helpers/db/mongodb.js")();

// Configuring port
const port = process.env.PORT || 9000;

const app = express();

// Configure middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'html');

// Static folder
app.use(express.static(__dirname + '/views/'));

// Middleware per la gestione della sessione
app.use(sessionMiddleware);

// Defining route middleware
app.use('/api', require('./routes/api'));

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/api`);

module.exports = app;
