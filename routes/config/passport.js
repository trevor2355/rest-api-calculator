const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
const services = require('../services/usersServices.js');

const pathToKey = path.join(__dirname, '../..', 'id_rsa_pub.pem');

const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// This will extract the token and decrypt it.
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        // The JWT is valid!
        let user = services.selectUser(jwt_payload.sub)
          .then(result => {
            let user = result[0].dataValues;
            done(null, user);
          })
          .catch(err => {
            console.log(err);
            done(err, false);
          })
    }));
};