module.exports.initServer = async function () {
  const Config = require("config");
  const express = require("express");
  const router = require("./controllers/router");

  const app = express();

  app.use(express.json());
  app.use(router);

  app.listen(3000);

  console.log(`Server started, see http://localhost:8080
        Endpoints:
            * GET  /users
            * POST /users
            * GET  /users?limit=:limit&offset=:offeset
            * GET  /users/:id`);
};
