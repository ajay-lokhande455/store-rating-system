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


exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    console.log(error);
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
          { name: { [Op.like]: `%${query}%` } },  
          { address: { [Op.like]: `%${query}%` } }  
        ]
      }
    });

    console.log("Found stores:", stores);
    res.json(stores);
  } catch (error) {
    console.error("Error in searchStores:", error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};


exports.getStores = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ error: 'Store not found.....' });
    res.json(store);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

