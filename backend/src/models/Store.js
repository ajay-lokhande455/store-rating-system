const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Store = sequelize.define('Store', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING(60), allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  image: { type: DataTypes.STRING(1500), allowNull: false },  
  address: { type: DataTypes.STRING(400), allowNull: false },
  owner_id: { type: DataTypes.UUID, allowNull: false },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  total_ratings: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = Store;
