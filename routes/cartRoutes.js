const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Add item to cart
router.post("/add", cartController.addItemToCart);
// Edit item in cart
router.put("/edit/:orderItemId", cartController.editCartItem);
// Delete item from cart
router.delete("/delete/:orderItemId", cartController.deleteCartItem);
// Get all cart items for a session
router.get("/:sessionId", cartController.getCartItems);
// Get cart items by promotionId
router.get('/:sessionId/by-promotion/:promotionId', cartController.getCartItemsByPromotion);

module.exports = router;
