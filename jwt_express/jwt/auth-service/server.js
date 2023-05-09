module.exports.initServer = async function () {
  const express = require("express");

  const router = require("./controllers/router");

  const app = express();

  app.use(express.json());
  app.use(router);
  app.listen(8080);

  console.log(`Server started, see http://localhost:8080
        Endpoints:
            * POST /login`);
};
