const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUserById
} = require('../controllers/userController');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserById);

module.exports = router;
