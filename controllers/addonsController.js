const { readJson, writeJson } = require('../utils/fileHelper');
const path = require('path');
const fs = require('fs');

const ITEM_ADDON_PATH = path.join(__dirname, '../data/itemAddonMapping.json');
const ADDONS_PATH = path.join(__dirname, '../data/addons.json');

const getAddons = (req, res) => {
  const addons = readJson('addons.json');
  res.json(addons);
};

const getAddonById = (req, res) => {
  const addons = readJson('addons.json');
  const addon = addons.find(a => a.id === req.params.id);
  if (addon) {
    res.json(addon);
  } else {
    res.status(404).json({ message: 'Addon not found' });
  }
};

const updateAddonById = (req, res) => {
  const addons = readJson('addons.json');
  const index = addons.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    addons[index] = { ...addons[index], ...req.body };
    writeJson('addons.json', addons);
    res.json(addons[index]);
  } else {
    res.status(404).json({ message: 'Addon not found' });
  }
};

const deleteAddonById = (req, res) => {
  let addons = readJson('addons.json');
  const index = addons.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    const deleted = addons.splice(index, 1);
    writeJson('addons.json', addons);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Addon not found' });
  }
};

const getAddonsByItemId = (req, res) => {
  const { itemId } = req.params;
  if (!itemId) return res.status(400).json({ message: 'itemId is required' });
  let itemAddonMapping = {};
  let addons = [];
  try {
    itemAddonMapping = JSON.parse(fs.readFileSync(ITEM_ADDON_PATH, 'utf8'));
    addons = JSON.parse(fs.readFileSync(ADDONS_PATH, 'utf8'));
  } catch (e) {
    return res.status(500).json({ message: 'Failed to read addon data' });
  }
  const addonIds = itemAddonMapping[itemId] || [];
  const result = addons.filter(a => addonIds.includes(a.id));
  res.json(result);
};

module.exports = {
  getAddons,
  getAddonById,
  updateAddonById,
  deleteAddonById,
  getAddonsByItemId,
};
