const { readJson, writeJson } = require('../utils/fileHelper');

const getMenuItems = (req, res) => {
  const items = readJson('menuItems.json');
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

module.exports = {
  getMenuItems,
  getMenuItemById,
  updateMenuItemById,
  deleteMenuItemById
};
