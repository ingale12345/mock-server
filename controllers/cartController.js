// Helper to read menu items
function readMenuItems() {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/menuItems.json'), 'utf8'));
  } catch (e) {
    return [];
  }
}
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const ORDERS_PATH = path.join(__dirname, "../data/orders.json");
const ITEM_ADDON_PATH = path.join(__dirname, "../data/itemAddonMapping.json");

function readOrders() {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_PATH, "utf8"));
  } catch (e) {
    return [];
  }
}

function writeOrders(orders) {
  fs.writeFileSync(ORDERS_PATH, JSON.stringify(orders, null, 2));
}

function readItemAddonMapping() {
  try {
    return JSON.parse(fs.readFileSync(ITEM_ADDON_PATH, "utf8"));
  } catch (e) {
    return {};
  }
}

// Helper to compare addons arrays (order-insensitive)
function addonsEqual(a1, a2) {
  if (a1.length !== a2.length) return false;
  const s1 = [...a1].sort().join(","),
    s2 = [...a2].sort().join(",");
  return s1 === s2;
}

// Add item to cart
exports.addItemToCart = (req, res) => {
  const {
    sessionId,
    itemCode,
    addons = [],
    quantity = 1,
    mode,
    promotionId,
    totalPrice,
    cookingRequest,
    categoryCode,
  } = req.body;
  if (!sessionId || !itemCode) {
    return res
      .status(400)
      .json({ error: "sessionId and itemCode are required" });
  }
  if (mode && !["dine-in", "take-away"].includes(mode)) {
    return res
      .status(400)
      .json({ error: "Invalid mode. Must be 'dine-in' or 'take-away'" });
  }
  const itemAddonMapping = readItemAddonMapping();
  // Check if itemCode is valid
  if (!itemAddonMapping[itemCode]) {
    return res.status(400).json({ error: "Invalid itemCode" });
  }
  // Check if all addons are valid for this item
  const validAddons = itemAddonMapping[itemCode];
  if (!addons.every((a) => validAddons.includes(a))) {
    return res.status(400).json({ error: "Invalid addon(s) for this item" });
  }
  let orders = readOrders();
  // Check for existing item with same sessionId, itemCode, addons, mode, and promotionId
  const existing = orders.find(
    (i) =>
      i.sessionId === sessionId &&
      i.itemCode === itemCode &&
      addonsEqual(i.addons, addons) &&
      i.mode === mode &&
      i.promotionId === promotionId
  );
  // Get imageUrl from menuItems.json
  const menuItems = readMenuItems();
  const menuItem = menuItems.find((m) => (m.itemId || '').trim() === (itemCode || '').trim());
  const imageUrl = menuItem && menuItem.imageUrl ? menuItem.imageUrl : null;
  if (existing) {
    existing.quantity += quantity;
    existing.imageUrl = imageUrl;
    writeOrders(orders);
    return res.json(existing);
  }
  const orderItem = {
    id: uuidv4(),
    sessionId,
    itemCode,
    addons: [...addons],
    quantity,
    mode: mode || null,
    promotionId: promotionId || null,
    totalPrice: typeof totalPrice === "number" ? totalPrice : null,
    cookingRequest: cookingRequest || null,
    categoryCode: categoryCode || null,
    imageUrl,
    status: 'draft', // new field
  };
  orders.push(orderItem);
  writeOrders(orders);
  res.status(201).json(orderItem);
};

// Update order item status
exports.updateOrderStatus = (req, res) => {
  const { orderItemId } = req.params;
  const { status } = req.body;
  let orders = readOrders();
  const item = orders.find((i) => i.id === orderItemId);
  if (!item) return res.status(404).json({ error: "Order item not found" });
  item.status = status;
  writeOrders(orders);
  res.json(item);
};

// Edit item in cart
exports.editCartItem = (req, res) => {
  const { orderItemId } = req.params;
  const {
    addons,
    quantity,
    promotionId,
    totalPrice,
    cookingRequest,
    category,
  } = req.body;
  let orders = readOrders();
  const item = orders.find((i) => i.id === orderItemId);
  if (!item) return res.status(404).json({ error: "Order item not found" });
  const itemAddonMapping = readItemAddonMapping();
  if (addons) {
    // Validate addons for this itemCode
    const validAddons = itemAddonMapping[item.itemCode];
    if (!addons.every((a) => validAddons.includes(a))) {
      return res.status(400).json({ error: "Invalid addon(s) for this item" });
    }
    item.addons = [...addons];
  }
  if (quantity !== undefined) {
    if (quantity < 1)
      return res.status(400).json({ error: "Quantity must be at least 1" });
    item.quantity = quantity;
  }
  if (promotionId !== undefined) {
    item.promotionId = promotionId;
  }
  if (totalPrice !== undefined) {
    item.totalPrice = totalPrice;
  }
  if (cookingRequest !== undefined) {
    item.cookingRequest = cookingRequest;
  }
  if (category !== undefined) {
    item.category = category;
  }
  writeOrders(orders);
  res.json(item);
};

// Delete item from cart
exports.deleteCartItem = (req, res) => {
  const { orderItemId } = req.params;
  let orders = readOrders();
  const idx = orders.findIndex((i) => i.id === orderItemId);
  if (idx === -1)
    return res.status(404).json({ error: "Order item not found" });
  const [deleted] = orders.splice(idx, 1);
  writeOrders(orders);
  res.json(deleted);
};

// Get all cart items for a session, with optional mode filter
exports.getCartItems = (req, res) => {
  const { sessionId } = req.params;
  const { mode } = req.query;
  const orders = readOrders();
  let items = orders.filter((i) => i.sessionId === sessionId);
  if (mode && ["dine-in", "take-away"].includes(mode)) {
    items = items.filter((i) => i.mode === mode);
  }
  res.json(items);
};

// Get cart items by promotionId
exports.getCartItemsByPromotion = (req, res) => {
  const { sessionId, promotionId } = req.params;
  const orders = readOrders();
  const filtered = orders.filter(
    (i) => i.sessionId === sessionId && i.promotionId === promotionId
  );
  res.json(filtered);
};
