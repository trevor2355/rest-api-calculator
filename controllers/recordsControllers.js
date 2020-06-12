const recordsModel = require('../models/recordsModels.js');

const getAllRecords = (req, res) => {
  recordsModel.selectAllRecords()
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
  recordsModel.selectRecord(recordId)
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
  recordsModel.selectAllRecordsOfUser(userId)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ err })
    })
}

const postRecord = (req, res) => {
  let record = req.body;
  recordsModel.insertRecord(record)
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
  recordsModel.updateRecord(recordId, update)
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
  recordsModel.deleteRecord(recordId)
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