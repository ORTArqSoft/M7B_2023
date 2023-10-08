const express = require("express");
const mongoose = require("mongoose");

const app = express();
const productRoutes = require("./routes/productRoutes");

const port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(express.json());
app.use("/api/products", productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
