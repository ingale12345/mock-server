const { readJson, writeJson } = require("../utils/fileHelper");

const getRestaurants = (req, res) => {
  const restaurants = readJson("restaurants.json");
  res.json(restaurants);
};

// Filter by restaurant code and/or group code
const filterRestaurants = (req, res) => {
  const { code, groupcode } = req.query;
  let restaurants = readJson('restaurants.json');
  if (code) {
    restaurants = restaurants.filter(r => r.code === code);
  }
  if (groupcode) {
    restaurants = restaurants.filter(r =>
      r.groups && r.groups.some(g => g.code === groupcode)
    );
  }
  res.json(restaurants);
};

const getRestaurantById = (req, res) => {
  const restaurants = readJson("restaurants.json");
  const restaurant = restaurants.find((r) => r.id === req.params.id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
};

const createRestaurant = (req, res) => {
  const restaurants = readJson("restaurants.json");
  const newRestaurant = req.body;
  restaurants.push(newRestaurant);
  writeJson("restaurants.json", restaurants);
  res.status(201).json(newRestaurant);
};

const updateRestaurantById = (req, res) => {
  const restaurants = readJson("restaurants.json");
  const index = restaurants.findIndex((r) => r.id === req.params.id);
  if (index !== -1) {
    restaurants[index] = { ...restaurants[index], ...req.body };
    writeJson("restaurants.json", restaurants);
    res.json(restaurants[index]);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
};

const deleteRestaurantById = (req, res) => {
  let restaurants = readJson("restaurants.json");
  const index = restaurants.findIndex((r) => r.id === req.params.id);
  if (index !== -1) {
    const deleted = restaurants.splice(index, 1);
    writeJson("restaurants.json", restaurants);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
};

module.exports = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurantById,
  deleteRestaurantById,
  filterRestaurants,
};
