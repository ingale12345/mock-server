const express = require("express");
const router = express.Router();
const {
  getCategories,
  getMenuItems,
  getAddons,
  getPromotedAddons,
  getPromotions,
  getRestaurants,
} = require("../controllers/");

router.get("/categories", getCategories);
router.get("/menu", getMenuItems);
router.get("/addons", getAddons);
router.get("/promoted-addons", getPromotedAddons);
router.get("/promotions", getPromotions);
router.get("/restaurants", getRestaurants);

module.exports = router;
