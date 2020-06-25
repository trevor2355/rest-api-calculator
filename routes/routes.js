const express = require('express');
const router = express.Router();
const passport = require('passport');
const authHelpers = require('./helpers/authHelpers.js');
const recordsController = require('./controllers/recordsControllers.js');
const servicesController = require('./controllers/servicesControllers.js');
const usersController = require('./controllers/usersControllers.js');

// Login Route

router.post('/login', usersController.validateUser);


// Records Routes

router.get('/records', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, recordsController.getAllRecords);

router.get('/records/:recordId', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, recordsController.getRecord);

router.post('/records', passport.authenticate('jwt', { session: false }), recordsController.postRecord);

router.put('/records/:recordId', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, recordsController.updateRecord);

router.delete('/records/:recordId', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, recordsController.deleteRecord);


// Services Routes

router.get('/services', passport.authenticate('jwt', { session: false }), servicesController.getAllServices);

router.get('/services/:serviceId', passport.authenticate('jwt', { session: false }), servicesController.getService);

router.post('/services', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, servicesController.postService);

router.put('/services/:serviceId', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, servicesController.updateService);

router.delete('/services/:serviceId', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, servicesController.deleteService);


// Request Services Routes

router.post('/services/request/:serviceId', passport.authenticate('jwt', { session: false }), servicesController.request)

router.post('/services/randomstringgenerator', passport.authenticate('jwt', { session: false }), servicesController.requestRandomString)


// Users Routes

router.get('/users', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, usersController.getAllUsers);

router.get('/users/:userId', passport.authenticate('jwt', { session: false }), authHelpers.checkUserRequestIsAllowed, usersController.getUser);

router.get('/users/:userId/records', passport.authenticate('jwt', { session: false }), authHelpers.checkUserRequestIsAllowed, recordsController.getUserRecords);

router.post('/users', usersController.postUser);

router.put('/users/:userId', passport.authenticate('jwt', { session: false }), authHelpers.checkUserRequestIsAllowed, usersController.updateUser);

router.delete('/users/:userId', passport.authenticate('jwt', { session: false }), authHelpers.checkAdminRole, usersController.deleteUser);

module.exports = router