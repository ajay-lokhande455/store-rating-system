const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const sequelize = require('./src/config/db');
const storeRoutes = require('./src/routes/storeRoutes');
const ratingRoutes = require('./src/routes/ratingRoutes');
const userRoutes = require('./src/routes/userRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => 
    res.json({res : 'Welcome to the Store API!'})
);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => console.error('Database sync error:', error));