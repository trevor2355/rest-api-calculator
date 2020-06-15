const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersControllers.js');

usersRouter.post('/', usersController.validateUser);

module.exports = usersRouter;