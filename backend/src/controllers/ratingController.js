const Rating = require('../models/Rating');
const Store = require('../models/Store');

exports.submitRating = async (req, res) => {
  try {
    const { user_id, store_id, rating, description } = req.body;


    const newRating = await Rating.create({ user_id, store_id, rating, description });

    const ratings = await Rating.findAll({ where: { store_id } });
    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = sumRatings / totalRatings;

    await Store.update({ total_rating: averageRating }, { where: { id: store_id } });

    res.json({ message: 'Rating submitted successfully', newRating, newTotalRating: averageRating });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid data' });
  }
};
