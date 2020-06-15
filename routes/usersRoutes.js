const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersControllers.js');
const recordsController = require('../controllers/recordsControllers.js');
const passport = require('passport');
const authHelpers = require('../helpers/authHelpers.js');

usersRouter.get('/', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, usersController.getAllUsers);

usersRouter.get('/:userId', passport.authenticate('jwt', { session: false }), authHelpers.checkUserRequestIsAllowed, usersController.getUser);

usersRouter.get('/:userId/records', passport.authenticate('jwt', { session: false }), authHelpers.checkUserRequestIsAllowed, recordsController.getUserRecords);

usersRouter.post('/', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, usersController.postUser);

usersRouter.put('/:userId', passport.authenticate('jwt', { session: false }), authHelpers.checkUserRequestIsAllowed, usersController.updateUser);

usersRouter.delete('/:userId', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, usersController.deleteUser);

module.exports = usersRouter;