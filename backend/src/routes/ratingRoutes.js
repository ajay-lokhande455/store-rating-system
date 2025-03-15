const express = require('express');
const { submitRating } = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/submit', authMiddleware(['user']), submitRating);

module.exports = router;