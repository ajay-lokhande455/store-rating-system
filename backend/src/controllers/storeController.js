const Store = require('../models/Store');

exports.createStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;
    const store = await Store.create({ name, email, address, owner_id });
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