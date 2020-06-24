const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();
const usersRoutes = require('./routes/usersRoutes.js')
const servicesRoutes = require('./routes/servicesRoutes.js')
const recordsRoutes = require('./routes/recordsRoutes.js')
const loginRoutes = require('./routes/loginRoutes.js')
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
app.use('/api/users', usersRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/records', recordsRoutes)
app.use('/login', loginRoutes)

const db = require('./db/connection.js');