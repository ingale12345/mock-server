const express = require('express');
const router = express.Router();
const {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurantById,
  deleteRestaurantById
} = require('../controllers/restaurantController');

const { filterRestaurants } = require('../controllers/restaurantController');

router.get('/', getRestaurants);
// GET /api/restaurants/filter?code=...&groupcode=...
router.get('/filter', filterRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', createRestaurant);
router.put('/:id', updateRestaurantById);
router.delete('/:id', deleteRestaurantById);

module.exports = router;
