const recordsServices = require('../services/recordsServices.js');
const helpers = require('../helpers/helpers.js');

const getAllRecords = (req, res) => {
  let page = req.query.page;
  let pageSize = req.query.pageSize;
  let searchTerm = req.query.searchTerm
  let filterFields = helpers.collectFilterFields([], 1, req.query);
  recordsServices.selectAllRecords(page, pageSize, searchTerm, filterFields)
    .then(records => {
      res.status(200).json(records)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err })
    })
}

const getRecord = (req, res) => {
  let recordId = req.params.recordId;
  recordsServices.selectRecord(recordId)
  .then(record => {
    res.status(200).json(record)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
}

const getUserRecords = (req, res) => {
  let userId = req.params.userId
  let page = req.query.page;
  let pageSize = req.query.pageSize;
  let searchTerm = req.query.searchTerm
  let filterFields = helpers.collectFilterFields([], 1, req.query);
  recordsServices.selectAllRecordsOfUser(userId, page, pageSize, searchTerm, filterFields)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err })
    })
}

const postRecord = (req, res) => {
  let record = req.body;
  recordsServices.insertRecord(record)
  .then(result => {
    res.status(201).json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
}

const updateRecord = (req, res) => {
  let recordId = req.params.recordId;
  let update = req.body;
  delete update.id
  delete update.uuid
  console.log('recordID: ', recordId)
  console.log('update: ', update)
  recordsServices.updateRecord(recordId, update)
  .then(result => {
    console.log('result: ', result)
    res.status(201).json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
}

const deleteRecord = (req, res) => {
  let recordId = req.params.recordId;
  recordsServices.deleteRecord(recordId)
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
}

module.exports = {
  getAllRecords,
  getRecord,
  getUserRecords,
  postRecord,
  updateRecord,
  deleteRecord
}