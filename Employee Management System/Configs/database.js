require('dotenv').config();
const fs = require('fs');
const Sequelize = require('sequelize')

const DB_CREDENTIAL = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: process.env.DB_LOGGING === 'true' ? console.log : false,
  dialect: process.env.DB_CONNECTION,
  //dialect: 'mssql',
  // dialectOptions: {
  //     options: {
  //         encrypt: true,
  //     },
  // },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}

sequelize = new Sequelize(DB_CREDENTIAL)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database :)\n')
  })
  .catch(err => {
    console.log('TCL: err', err)
    console.error('Unable to connect to the database :(\n')
  })

module.exports = {
  development: DB_CREDENTIAL,
  production: DB_CREDENTIAL,
  test: DB_CREDENTIAL,
  master: DB_CREDENTIAL,
  sequelize
};
