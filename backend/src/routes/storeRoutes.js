
const express = require('express');
const { createStore, getStores, searchStores, getAllStores } = require('../controllers/storeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware(['admin']), createStore);
router.get('/all', authMiddleware(), getAllStores);
router.get('/:id', authMiddleware(), getStores)
router.get('/search',authMiddleware(), searchStores);

module.exports = router;
