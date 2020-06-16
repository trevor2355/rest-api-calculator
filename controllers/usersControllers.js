const usersModel = require('../models/usersModels.js');
const helpers = require('../helpers/helpers.js');
const authHelpers = require('../helpers/authHelpers.js')

const getAllUsers = (req, res) => {
  let page = req.query.page;
  let pageSize = req.query.pageSize;
  let searchTerm = req.query.searchTerm
  let filterFields = helpers.collectFilterFields([], 1, req.query);
  usersModel.selectAllUsers(page, pageSize, searchTerm, filterFields)
    //Delete the hashes and salts before sending request to client
    .then(unsafeUsers => {
      let users = unsafeUsers.map(user => {
        delete user.dataValues.hash;
        delete user.dataValues.salt;
        return user
      });
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err })
    })
}

const getUser = (req, res) => {
  let userId = req.params.userId;
  usersModel.selectUser(userId)
    .then(unsafeUsers => {
      let user = unsafeUsers.map(user => {
        delete user.dataValues.hash;
        delete user.dataValues.salt;
        return user
      });
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ err })
    })
}

//this route is used to register a user to the platform
const postUser = (req, res) => {
  let user = req.body;
  let saltHash = authHelpers.genPassword(req.body.password);
  user.salt = saltHash.salt;
  user.hash = saltHash.hash;
  delete user.password;
  usersModel.insertUser(user)
    .then(result => {
      delete result.dataValues.hash
      delete result.dataValues.salt
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
      let user = result[0].dataValues

      if(loginCredentials.admin && user.role !== 'admin') {
        console.log('User not authorized')
        throw new Error('User not authorized')
      }
      let actualHash = user.hash;
      let actualSalt = user.salt;

      const isValid = authHelpers.validPassword(req.body.password, actualHash, actualSalt);

      delete user.hash;
      delete user.salt;

      if (isValid) {
        const tokenObject = authHelpers.issueJWT(user);
        res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, user });
    } else {
        console.log('you entered the wrong password')
        throw new Error('you entered the wrong password')
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