const usersServices = require('../services/usersServices.js');
const helpers = require('../helpers/helpers.js');
const authHelpers = require('../helpers/authHelpers.js')

const getAllUsers = (req, res) => {
  let page = req.query.page;
  let pageSize = req.query.pageSize;
  let searchTerm = req.query.searchTerm;
  let sortBy = req.query.sortBy;
  let order = req.query.order;
  let filterFields = helpers.collectFilterFields([], 1, req.query);
  usersServices.selectAllUsers(page, pageSize, searchTerm, filterFields, sortBy, order)
    // Delete the hashes and salts before sending request to client
    .then(unsafeUsers => {
      let safeUsers = unsafeUsers.rows.map(user => {
        delete user.dataValues.hash;
        delete user.dataValues.salt;
        return user
      });
      let users = {
        count: unsafeUsers.count,
        rows: safeUsers
      }
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err })
    })
}

const getUser = (req, res) => {
  let userId = req.params.userId;
  usersServices.selectUser(userId)
    .then(unsafeUsers => {
      // Delete the hashes and salts before sending request to client
      let user = unsafeUsers.map(user => {
        delete user.dataValues.hash;
        delete user.dataValues.salt;
        return user;
      });
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ err });
    })
}

//this controller is used to register a user to the platform

const postUser = (req, res) => {
  let user = req.body;
  let saltHash = authHelpers.genPassword(req.body.password);
  user.salt = saltHash.salt;
  user.hash = saltHash.hash;
  delete user.password;
  usersServices.insertUser(user)
    // Delete the hashes and salts before sending request to client
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
  usersServices.updateUser(userId, update)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({ err })
    })
}

const deleteUser = (req, res) => {
  let userId = req.params.userId;
  usersServices.deleteUser(userId)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({ err })
    })
}

// This controller contains the logic for logging in 

const validateUser = (req, res) => {
  let loginCredentials = req.body;
  usersServices.validateUser(loginCredentials.username)
    .then(result => {
      let user = result[0].dataValues

      if(loginCredentials.admin && user.role !== 'admin') {
        throw new Error('User not authorized')
      }
      let actualHash = user.hash;
      let actualSalt = user.salt;

      const isValid = authHelpers.validPassword(req.body.password, actualHash, actualSalt);

      // Delete the hashes and salts before sending request to client
      delete user.hash;
      delete user.salt;

      if (isValid) {
        const tokenObject = authHelpers.issueJWT(user);
        res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, user });
    } else {
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