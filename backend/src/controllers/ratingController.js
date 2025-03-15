const Rating = require('../models/Rating');

exports.submitRating = async (req, res) => {
  try {
    const { user_id, store_id, rating, description } = req.body;
    const newRating = await Rating.create({ user_id, store_id, rating, description });
    res.json({ message: 'Rating submitted successfully', newRating });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};