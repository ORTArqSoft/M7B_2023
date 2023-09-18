const express = require("express");
const redis = require("redis");
const axios = require("axios");

const app = express();
const port = 3000;

const redisClient = redis.createClient();
redisClient.on("connect", function () {
  console.log("Connected to Redis");
});

redisClient.connect();

app.use(async (req, res, next) => {
  const cacheKey = req.url;
  const data = await redisClient.get(cacheKey);
  if (data) {
    res.send(JSON.parse(data));
  } else {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com" + req.url
      );
      const responseData = response.data;

      await redisClient.setEx(cacheKey, 10, JSON.stringify(responseData));

      res.send(responseData);
    } catch (error) {
      console.error("Error al realizar la solicitud HTTP:", error);
      res.status(500).send("Error del servidor");
    }
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
