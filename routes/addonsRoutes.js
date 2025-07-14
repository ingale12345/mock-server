const express = require("express");
const router = express.Router();
const {
  getAddons,
  getAddonById,
  updateAddonById,
  deleteAddonById,
  getAddonsByItemId,
} = require("../controllers");

router.get("/", getAddons);
router.get("/by-item/:itemId", getAddonsByItemId);
router.get("/:id", getAddonById);
router.put("/:id", updateAddonById);
router.delete("/:id", deleteAddonById);

module.exports = router;
