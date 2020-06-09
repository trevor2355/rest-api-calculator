const recordsModel = require('../models/recordsModels.js');

const getAllRecords = (req, res) => {
  console.log('getAllRecords')
  recordsModel.selectAllRecords()
    .then(records => {
      console.log(records)
      res.status(200).json(records)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err })
    })
}

const getRecord = (req, res) => {
  console.log('getRecord')
  let recordId = req.params.recordId;
  recordsModel.selectRecord(recordId)
  .then(record => {
    console.log(record)
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
  console.log('postRecord')
  console.log(req.body)
  let record = req.body;
  recordsModel.insertRecord(record)
  .then(result => {
    console.log(result)
    res.status(201).json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
}

const updateRecord = (req, res) => {
  console.log('updateRecord')
  let recordId = req.params.recordId;
  let update = req.body;
  recordsModel.updateRecord(recordId, update)
  .then(result => {
    console.log(result)
    res.status(201).json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
}

const deleteRecord = (req, res) => {
  console.log('deleteRecord')
  let recordId = req.params.recordId;
  recordsModel.deleteRecord(recordId)
  .then(result => {
    console.log(result)
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