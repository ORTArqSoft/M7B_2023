const Config = require("config");
const express = require("express");
const axios = require("axios");
const app = express();
let credentials = Config.get("credentials");

app.use(express.json());

app.post("/orders", async (req, res) => {
  // create new order
  const userId = req.body.userId;
  try {
    const user = await axios.get(
      `${credentials.SERVICES1_BASE_URL}:${credentials.SERVICES1_PORT}/users/${userId}`
    );
  } catch (error) {
    console.log("error", error);
    res.send("Ha ocurrido un error");
  }
  // do something with the user object
});

app.put("/orders/:orderId", (req, res) => {
  // update order by ID
});

app.delete("/orders/:orderId", (req, res) => {
  // delete order by ID
});

app.listen(4000, () => console.log("Order service listening on port 4000!"));
