const Sequelize = require('sequelize');
// require('dotenv').config();

console.log(process.env.POSTGRES_DB)

// Establish the connection 
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PW, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres'
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;