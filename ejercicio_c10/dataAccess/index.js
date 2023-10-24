const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(`${process.env.MONGO_BASE_URL}/${process.env.MONGO_DB}`, {
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