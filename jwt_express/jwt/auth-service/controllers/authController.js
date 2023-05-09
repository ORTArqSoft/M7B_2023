const AuthService = require("../services/authService");

module.exports = class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  async login(req, res) {
    let data = req.body;
    let token = await this.authService.login(data);
    if (token) {
      res.send({ token: token });
    } else {
      res.status(401).send({ status: 401, message: "Unauthorized" });
    }
  }
};
