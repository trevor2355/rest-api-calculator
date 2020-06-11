const express = require('express');
const servicesRouter = express.Router();
const servicesController = require('../controllers/servicesControllers.js');

servicesRouter.get('/', servicesController.getAllServices);

servicesRouter.get('/:serviceId', servicesController.getService);

servicesRouter.post('/', servicesController.postService);

servicesRouter.put('/:serviceId', servicesController.updateService);

servicesRouter.delete('/:serviceId', servicesController.deleteService);

servicesRouter.post('/randomstringgenerator', servicesController.requestRandomString)

module.exports = servicesRouter;