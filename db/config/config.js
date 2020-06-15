require('dotenv').config();

console.log(process.env.POSTGRES_USER, process.env.POSTGRES_PW, process.env.POSTGRES_DB, process.env.POSTGRES_HOST,)

module.exports = {
"development": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PW,
    "database": process.env.POSTGRES_DB,
    "host": process.env.POSTGRES_HOST,
    "dialect": "postgres"
},
"test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
},
"production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
}
};