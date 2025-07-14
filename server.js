const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const cors = require("cors");
// const mockRoutes = require("./routes");

const categoriesRoutes = require("./routes/categoriesRoutes");
const menuRoutes = require("./routes/menuRoutes");
const addonsRoutes = require("./routes/addonsRoutes");
const restaurantsRoutes = require("./routes/restaurantsRoutes");
const promotionsRoutes = require("./routes/promotionsRoutes.js");
const cartRoutes = require("./routes/cartRoutes");
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/categories", categoriesRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/addons", addonsRoutes);
app.use("/api/restaurants", restaurantsRoutes);
app.use("/api/promotions", promotionsRoutes);
// Serve static files if needed
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
});
