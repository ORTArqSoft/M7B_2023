const express = require("express");
const mongoose = require("mongoose");

const Product = require("./models/product");

const app = express();
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

// Routes
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
