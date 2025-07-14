const { readJson, writeJson } = require("../utils/fileHelper");

const getpromotions = (req, res) => {
  const promotions = readJson("promotions.json");
  res.json(promotions);
};

const getPromotionById = (req, res) => {
  const promotions = readJson("promotions.json");
  const promotion = promotions.find((p) => p.promotionId === req.params.id);
  if (promotion) {
    res.json(promotion);
  } else {
    res.status(404).json({ message: "Promotion not found" });
  }
};

const updatePromotionById = (req, res) => {
  const promotions = readJson("promotions.json");
  const index = promotions.findIndex((p) => p.promotionId === req.params.id);
  if (index !== -1) {
    promotions[index] = { ...promotions[index], ...req.body };
    writeJson("promotions.json", promotions);
    res.json(promotions[index]);
  } else {
    res.status(404).json({ message: "Promotion not found" });
  }
};

const deletePromotionById = (req, res) => {
  let promotions = readJson("promotions.json");
  const index = promotions.findIndex((p) => p.promotionId === req.params.id);
  if (index !== -1) {
    const deleted = promotions.splice(index, 1);
    writeJson("promotions.json", promotions);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: "Promotion not found" });
  }
};
module.exports = {
  getpromotions,
  getPromotionById,
  updatePromotionById,
  deletePromotionById,
};
