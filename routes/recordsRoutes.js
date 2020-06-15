const express = require('express');
const recordsRouter = express.Router();
const recordsController = require('../controllers/recordsControllers.js');
const passport = require('passport');
const authHelpers = require('../helpers/authHelpers.js');

recordsRouter.get('/', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, recordsController.getAllRecords);

recordsRouter.get('/:recordId', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, recordsController.getRecord);

recordsRouter.post('/', passport.authenticate('jwt', { session: false }), recordsController.postRecord);

recordsRouter.put('/:recordId', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, recordsController.updateRecord);

recordsRouter.delete('/:recordId', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, recordsController.deleteRecord);


module.exports = recordsRouter;