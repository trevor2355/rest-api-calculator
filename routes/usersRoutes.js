const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersControllers.js');
const recordsController = require('../controllers/recordsControllers.js');

usersRouter.get('/', usersController.getAllUsers);

usersRouter.get('/:userId', usersController.getUser);

usersRouter.get('/:userId/records', recordsController.getUserRecords);

usersRouter.post('/', usersController.postUser);

usersRouter.put('/:userId', usersController.updateUser);

usersRouter.delete('/:userId', usersController.deleteUser);

module.exports = usersRouter;