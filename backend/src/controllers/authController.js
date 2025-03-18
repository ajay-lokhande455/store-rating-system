const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Store = require('../models/Store');
require('dotenv').config();

exports.signup = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, address, role });
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    let storeId = null;
    if (user.role === 'store_owner') {
      const store = await Store.findOne({ where: { owner_id: user.id } });
      if (store) {
        storeId = store.id;
      }
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '48h' });

    res.json({ 
      token, 
      user,
      storeId 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
