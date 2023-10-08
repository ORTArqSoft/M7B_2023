const User = require("../models/user"); // Import the User model
const Product = require("../models/product"); // Import your product model

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("favorites");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const product = await Product.findById(req.params.productId);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    user.favorites.push(product._id);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
