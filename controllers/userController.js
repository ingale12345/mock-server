const { readJson, writeJson } = require("../utils/fileHelper");

// Get all users
const getUsers = (req, res) => {
  const users = readJson("users.json");
  res.json(users);
};

// Get user by ID
const getUserById = (req, res) => {
  const users = readJson("users.json");
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Update user by ID
const updateUserById = (req, res) => {
  const users = readJson("users.json");
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    writeJson("users.json", users);
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUserById,
};
