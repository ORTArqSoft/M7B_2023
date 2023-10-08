// routes/userRouter.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);

router.get("/", userController.getAllUsers);

router.post("/:userId/favorites/:productId", userController.addToFavorites);

module.exports = router;
