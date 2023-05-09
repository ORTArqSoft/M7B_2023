module.exports.initServer = async function () {
  const express = require("express");
  const router = require("./controllers/router");
  const jwt = require("jsonwebtoken");
  const fs = require("fs");
  const publicKey = fs.readFileSync("./config/public.key", "utf8");

  const app = express();

  // Middleware function to authenticate JWT
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, publicKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  // Apply the JWT validation middleware globally
  app.use(authenticateToken);
  app.use(express.json());
  app.use(router);

  app.listen(8081);

  console.log(`Server started, see http://localhost:8081
        Endpoints:
            * GET  /orders
            * POST /orders
            * GET  /orders?limit=:limit&offset=:offeset
            * GET  /orders/:id`);
};
