const express = require('express');
const { getAllUsers, getUserById, updatePassword, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.get('/all', authMiddleware(['admin']), getAllUsers); // Admin only
router.get('/:id', authMiddleware(), getUserById);
router.put('/update-password', authMiddleware(), updatePassword);
router.delete('/:id', authMiddleware(['admin']), deleteUser); 

module.exports = router;
