
const express = require('express');
const { createStore, getStores, searchStores } = require('../controllers/storeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware(['admin']), createStore);
router.get('/all', authMiddleware(), getStores);
router.get('/search', searchStores);

module.exports = router;
