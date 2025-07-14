const express = require("express");
const router = express.Router();
const {
  getpromotions,
  getPromotionById,
  updatePromotionById,
  deletePromotionById,
} = require("../controllers/promotionsController");

router.get("/", getpromotions);
router.get("/:id", getPromotionById);
router.put("/:id", updatePromotionById);
router.delete("/:id", deletePromotionById);

module.exports = router;
