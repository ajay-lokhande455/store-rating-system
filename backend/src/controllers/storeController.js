const Store = require('../models/Store');
const { Op } = require('sequelize'); // Import Op for search queries

// Create a new store
exports.createStore = async (req, res) => {
  try {
    const { name, email, image, address, owner_id } = req.body;
    const store = await Store.create({ name, email, image, address, owner_id });
    res.json({ message: 'Store created successfully', store });
  } catch (error) {
    res.status(400).json({ error: 'Store already exists or invalid data' });
  }
};

// Get all stores
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Search stores by name or address
exports.searchStores = async (req, res) => {
  try {
    const { query } = req.query; // Get search query from request

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const stores = await Store.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } }, // Case-insensitive search for name
          { address: { [Op.iLike]: `%${query}%` } } // Case-insensitive search for address
        ]
      }
    });

    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
