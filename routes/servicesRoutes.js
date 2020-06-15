const express = require('express');
const servicesRouter = express.Router();
const servicesController = require('../controllers/servicesControllers.js');
const passport = require('passport');
const authHelpers = require('../helpers/authHelpers.js');

servicesRouter.get('/', passport.authenticate('jwt', { session: false }), servicesController.getAllServices);

servicesRouter.get('/:serviceId', passport.authenticate('jwt', { session: false }), servicesController.getService);

servicesRouter.post('/', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, servicesController.postService);

servicesRouter.put('/:serviceId', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, servicesController.updateService);

servicesRouter.delete('/:serviceId', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, servicesController.deleteService);

servicesRouter.post('/randomstringgenerator', passport.authenticate('jwt', { session: false }), servicesController.requestRandomString)

module.exports = servicesRouter;