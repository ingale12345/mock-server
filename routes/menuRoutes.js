const express = require("express");
const router = express.Router();
const {
  getMenuItems,
  getMenuItemById,
  updateMenuItemById,
  deleteMenuItemById,
} = require("../controllers/menuController");

router.get("/", getMenuItems);
router.get("/:id", getMenuItemById);
router.put("/:id", updateMenuItemById);
router.delete("/:id", deleteMenuItemById);

module.exports = router;
