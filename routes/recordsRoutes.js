const express = require('express');
const recordsRouter = express.Router();
const recordsController = require('../controllers/recordsControllers.js');

recordsRouter.get('/', recordsController.getAllRecords);

recordsRouter.get('/:recordId', recordsController.getRecord);

recordsRouter.post('/', recordsController.postRecord);

recordsRouter.put('/:recordId', recordsController.updateRecord);

recordsRouter.delete('/:recordId', recordsController.deleteRecord);


module.exports = recordsRouter;