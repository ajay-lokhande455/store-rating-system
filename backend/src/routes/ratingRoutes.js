const express = require('express');
const { submitRating, getRatingsByStore } = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/submit', authMiddleware(['user']), submitRating);
router.get('/:id', authMiddleware(), getRatingsByStore);

module.exports = router;