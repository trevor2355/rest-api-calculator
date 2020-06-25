const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes.js');
const passport = require('passport');
require('./config/passport')(passport);


const PORT = process.env.PORT || 3000;

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(passport.initialize());

app.listen(PORT, () => {
  console.log(`REST API Calculator Server listening on PORT: ${PORT}`)
})

//handle the api routes here
app.use('/api', routes)

const db = require('../db/connection.js');