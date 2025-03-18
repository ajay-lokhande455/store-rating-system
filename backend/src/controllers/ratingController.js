const { Rating, User, Store } = require('../models');

// Rating Controllers
exports.submitRating = async (req, res) => {
  try {
    const { user_id, store_id, rating, description } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const store = await Store.findByPk(store_id);
    if (!store) return res.status(404).json({ error: 'Store not found' });
    const newRating = await Rating.create({ user_id, store_id, rating, description });
    const ratings = await Rating.findAll({ where: { store_id } });
    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = sumRatings / totalRatings;
    await Store.update({ rating: averageRating, total_ratings: totalRatings }, { where: { id: store_id } });
    res.json({ message: 'Rating submitted successfully', newRating, newTotalRating: averageRating });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};


exports.getRatingsByStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    
    const ratings = await Rating.findAll({
      where: { store_id: storeId},
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'], 
        },
        {
          model: Store,
          attributes: ['id', 'name'],
        },
      ],
    });

    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
