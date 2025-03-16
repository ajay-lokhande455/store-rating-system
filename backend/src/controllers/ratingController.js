const Rating = require('../models/Rating');
const Store = require('../models/Store');

// Submit Rating
exports.submitRating = async (req, res) => {
  
  try {
    const { user_id, store_id, rating, description } = req.body;

    // Create a new rating
    const newRating = await Rating.create({ user_id, store_id, rating, description });

    // Fetch all ratings for the store
    const ratings = await Rating.findAll({ where: { store_id } });
    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = sumRatings / totalRatings;

    // Update store's total rating
    await Store.update({ total_rating: averageRating }, { where: { id: store_id } });

    res.json({ message: 'Rating submitted successfully', newRating, newTotalRating: averageRating });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Get Ratings by Store
exports.getRatingsByStore = async (req, res) => {
  try {
    const { store_id } = req.params;
    
    // Check if store exists
    const store = await Store.findByPk(store_id);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    // Fetch ratings for the store
    const ratings = await Rating.findAll({
      where: { store_id },
      order: [['createdAt', 'DESC']], // Sort by latest first
    });

    res.json({ store, ratings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
