const express = require('express');
const { createStore, getAllStores, getStores, searchStores } = require('../controllers/storeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware(['admin']), createStore);
router.get('/all', getAllStores);
router.get('/search', searchStores); 
router.get('/:id', authMiddleware(), getStores);

module.exports = router;
