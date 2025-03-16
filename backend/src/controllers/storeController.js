const Store = require('../models/Store');
const { Op } = require('sequelize'); 


exports.createStore = async (req, res) => {
  try {
    const { name, email, image, address, owner_id } = req.body;
    const store = await Store.create({ name, email, image, address, owner_id });
    res.json({ message: 'Store created successfully', store });
  } catch (error) {
    res.status(400).json({ error: 'Store already exists or invalid data' });
  }
};


exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll({ include: [{ model: User, as: 'owner' }] });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.searchStores = async (req, res) => {
  try {
    const { query } = req.query; 
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const stores = await Store.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } }, 
          { address: { [Op.iLike]: `%${query}%` } } 
        ]
      }
    });

    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
