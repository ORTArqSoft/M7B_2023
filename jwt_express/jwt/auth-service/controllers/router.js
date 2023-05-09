const Router = require("express").Router;
const AuthController = require("./authController");

const router = new Router();
const auth = new AuthController();

router.post("/login", (req, res) => auth.login(req, res));

module.exports = router;
