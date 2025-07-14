const { readJson, writeJson } = require("../utils/fileHelper");

const getCategories = (req, res) => {
  const categories = readJson("categories.json");
  res.json(categories);
};

const getCategoryById = (req, res) => {
  const categories = readJson("categories.json");
  const category = categories.find((c) => c.categoryId === req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
};

const updateCategoryById = (req, res) => {
  const categories = readJson("categories.json");
  const index = categories.findIndex((c) => c.categoryId === req.params.id);
  if (index !== -1) {
    categories[index] = { ...categories[index], ...req.body };
    writeJson("categories.json", categories);
    res.json(categories[index]);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
};

const deleteCategoryById = (req, res) => {
  let categories = readJson("categories.json");
  const index = categories.findIndex((c) => c.categoryId === req.params.id);
  if (index !== -1) {
    const deleted = categories.splice(index, 1);
    writeJson("categories.json", categories);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
