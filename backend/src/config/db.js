require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: false, 
});

 sequelize.sync({ force: false, alter: true })
  .then(() => console.log('Database synchronized'))
  .catch((error) => console.error('Error syncing database:', error));

  module.exports = sequelize;

// Example usage: