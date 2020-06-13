const usersModel = require('../models/usersModels.js');
const helpers = require('../helpers/helpers.js');

const getAllUsers = (req, res) => {
  let page = req.query.page;
  let pageSize = req.query.pageSize;
  let searchTerm = req.query.searchTerm
  let filterFields = helpers.collectFilterFields([], 1, req.query);
  usersModel.selectAllUsers(page, pageSize, searchTerm, filterFields)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({ err })
    })
}

const getUser = (req, res) => {
  let userId = req.params.userId;
  usersModel.selectUser(userId)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ err })
    })
}

const postUser = (req, res) => {
  let user = req.body;
  usersModel.insertUser(user)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({ err })
    })
}

const updateUser = (req, res) => {
  let userId = req.params.userId;
  let update = req.body;
  usersModel.updateUser(userId, update)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({ err })
    })
}

const deleteUser = (req, res) => {
  let userId = req.params.userId;
  usersModel.deleteUser(userId)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({ err })
    })
}

const validateUser = (req, res) => {
  let loginCredentials = req.body;
  usersModel.validateUser(loginCredentials.username)
    .then(result => {
      if(loginCredentials.admin && result[0].dataValues.role !== 'admin') {
        throw new Error('User not authorized')
      }
      let actualPassword = result[0].dataValues.password;
      if (actualPassword === loginCredentials.password) {
        res.status(200).json(result[0])
      } else {
        throw new Error('Invalid Password');
      }
    })
    .catch(err => {
      res.status(404).json({ message: err })
    })
  }

module.exports = {
  getAllUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser,
  validateUser
}