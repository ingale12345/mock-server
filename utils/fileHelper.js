const fs = require("fs");
const path = require("path");

const filePath = (filename) => path.join(__dirname, "..", "data", filename);

const readJson = (filename) => {
  try {
    const data = fs.readFileSync(filePath(filename), "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeJson = (filename, jsonData) => {
  fs.writeFileSync(
    filePath(filename),
    JSON.stringify(jsonData, null, 2),
    "utf-8"
  );
};

module.exports = { readJson, writeJson };
