const express = require('express');
const { submitRating, getRatingsByStore } = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', authMiddleware(['store_owner']), getRatingsByStore);
router.post('/submit', authMiddleware(['user']), submitRating);


module.exports = router;