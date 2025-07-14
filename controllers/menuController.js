const { readJson, writeJson } = require('../utils/fileHelper');
const path = require('path');
const fs = require('fs');

const ORDERS_PATH = path.join(__dirname, '../data/orders.json');

function readOrders() {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_PATH, 'utf8'));
  } catch (e) {
    return [];
  }
}

const getMenuItems = (req, res) => {
  const items = readJson('menuItems.json');
  const { sessionId } = req.query;
  if (sessionId) {
    const orders = readOrders();
    const itemsWithQty = items.map(item => {
      const qty = orders
        .filter(o => o.sessionId === sessionId && o.itemCode === item.itemId)
        .reduce((sum, o) => sum + (o.quantity || 0), 0);
      return { ...item, selectedQuantity: qty };
    });
    return res.json(itemsWithQty);
  }
  res.json(items);
};

const getMenuItemById = (req, res) => {
  const items = readJson('menuItems.json');
  const item = items.find(i => i.itemId === req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Menu item not found' });
  }
};

const updateMenuItemById = (req, res) => {
  const items = readJson('menuItems.json');
  const index = items.findIndex(i => i.itemId === req.params.id);
  if (index !== -1) {
    items[index] = { ...items[index], ...req.body };
    writeJson('menuItems.json', items);
    res.json(items[index]);
  } else {
    res.status(404).json({ message: 'Menu item not found' });
  }
};

const deleteMenuItemById = (req, res) => {
  let items = readJson('menuItems.json');
  const index = items.findIndex(i => i.itemId === req.params.id);
  if (index !== -1) {
    const deleted = items.splice(index, 1);
    writeJson('menuItems.json', items);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Menu item not found' });
  }
};

const getMenuItemsByCategory = (req, res) => {
  const items = readJson('menuItems.json');
  const { category, sessionId } = req.query;
  if (!category) return res.status(400).json({ message: 'Category is required' });
  let filtered = items.filter(i => i.category?.toLowerCase() === category.toLowerCase());
  if (sessionId) {
    const orders = readOrders();
    filtered = filtered.map(item => {
      const qty = orders
        .filter(o => o.sessionId === sessionId && o.itemCode === item.itemId)
        .reduce((sum, o) => sum + (o.quantity || 0), 0);
      return { ...item, selectedQuantity: qty };
    });
  }
  res.json(filtered);
};

module.exports = {
  getMenuItems,
  getMenuItemById,
  updateMenuItemById,
  deleteMenuItemById,
  getMenuItemsByCategory,
};
