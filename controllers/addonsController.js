const { readJson, writeJson } = require('../utils/fileHelper');

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

module.exports = {
  getAddons,
  getAddonById,
  updateAddonById,
  deleteAddonById
};
