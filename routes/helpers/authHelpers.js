const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// This function will validate a users inputed password when logging in 

function validPassword(password, hash, salt) {
    let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
};

// This function will generate a salt and a hash to store in the database when a user is created

function genPassword(password) {
    let salt = crypto.randomBytes(32).toString('hex');
    let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
      salt: salt,
      hash: genHash
    };
};

// This function will create and issue a JWT for a user once they have successfully logged in

function issueJWT(user) {
  const pathToKey = path.join(__dirname, '../..', 'id_rsa_priv.pem');
  const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
  const _id = user.id;
  const expiresIn = '1d';
  const payload = {
    sub: _id,
    iat: Date.now()
  };
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  };
};

// This middleware function will check to make sure a user is admin before accessing certain routes

const checkAdminRole = function (req, res, next) {
  if(req.user.role === 'admin') {
    console.log('USER IS ADMIN   PERMISSION GRANTED');
    next();
  } else {
    //*!
    console.log('YOU DO NOT HAVE ACCESS');
  };
};

// This middleware function will check to maker sure a user is only requesting their personal data

const checkUserRequestIsAllowed = function (req, res, next) {
  if(req.user.role === 'admin') {
    console.log('USER IS ADMIN   PERMISSION GRANTED');
    next();
  } else {
    if (req.params.userId == req.user.id) {
      console.log('YOU HAVE ACCESS TO YOUR OWN RECORDS');
      next();
    } else {
      //*!
      console.log('YOU ONLY HAVE ACCESS TO YOUR OWN USER RECORDS');
    };
  };
};

module.exports = {
  validPassword,
  genPassword,
  issueJWT,
  checkAdminRole,
  checkUserRequestIsAllowed
};
