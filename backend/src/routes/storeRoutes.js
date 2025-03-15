
const express = require('express');
const { createStore, getStores } = require('../controllers/storeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware(['admin']), createStore);
router.get('/all', authMiddleware(), getStores);

module.exports = router;
