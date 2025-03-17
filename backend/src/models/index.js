const sequelize = require("../config/db");
const User = require('./User');
const Store = require('./Store');
const Rating = require('./Rating');

User.hasMany(Store, { foreignKey: 'owner_id' });
Store.belongsTo(User, { foreignKey: 'owner_id' });

User.hasMany(Rating, { foreignKey: 'user_id' });
Store.hasMany(Rating, { foreignKey: 'store_id' });
Rating.belongsTo(User, { foreignKey: 'user_id' });
Rating.belongsTo(Store, { foreignKey: 'store_id' });

sequelize.sync({ alter: true }) 
  .then(() => console.log("Database synchronized"))
  .catch((error) => console.error(" Error syncing database:", error));

module.exports = { sequelize, User, Store, Rating };

