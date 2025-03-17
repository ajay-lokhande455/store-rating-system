const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
  // Import User model


const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING(60), allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING(400), allowNull: false },
    role: {
        type: DataTypes.ENUM('admin', 'user', 'store_owner'),
        defaultValue: 'user'
    }


    
});

User.associate = (models) => {
  User.hasMany(models.Rating, { foreignKey: 'user_id' });
  User.hasMany(models.Store, { foreignKey: 'owner_id' });
};

module.exports = User;