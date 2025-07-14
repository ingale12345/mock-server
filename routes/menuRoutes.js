const express = require("express");
const router = express.Router();
const {
  getMenuItems,
  getMenuItemById,
  updateMenuItemById,
  deleteMenuItemById,
  getMenuItemsByCategory,
} = require("../controllers/menuController");

router.get("/", getMenuItems);
router.get("/category", getMenuItemsByCategory);
router.get("/:id", getMenuItemById);
router.put("/:id", updateMenuItemById);
router.delete("/:id", deleteMenuItemById);

module.exports = router;
