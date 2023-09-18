const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient();

app.use(express.json());

client.on("connect", function () {
  console.log("Connected to Redis");
});

client.on("error", function (err) {
  console.error("Redis error:", err);
});

app.post("/api", async (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) {
    res.status(400).send("Both key and value are required");
  } else {
    await client.connect();
    try {
      await client.set(key, value);
      res.status(201).send(`Key '${key}' created`);
    } catch (err) {
      res.status(500).send(err.message);
    } finally {
      client.quit();
    }
  }
});

app.get("/api/:key", async (req, res) => {
  const { key } = req.params;
  await client.connect();
  try {
    const value = await client.get(key);
    res.send(value);
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    client.quit();
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
