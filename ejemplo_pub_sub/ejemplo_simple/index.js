const express = require("express");
const app = express();

app.use(express.json());

const subscribers = {
  // "eventName": []
};

app.post("/subscribe/:event", (req, res) => {
  const event = req.params.event;

  const subscriptionId = Math.random().toString(36).substr(2, 9);

  if (!subscribers[event]) {
    subscribers[event] = [];
  }

  subscribers[event].push({
    id: subscriptionId,
    response: res,
  });

  res.json({ subscriptionId, event });
});

app.post("/publish/:event", async (req, res) => {
  const event = req.params.event;
  const eventData = req.body;

  if (subscribers[event]) {
    subscribers[event].forEach((subscriber) => {
      subscriber.response.json(eventData);
    });
  }

  res.send("Publicado exitosamente");
});

app.listen(3000, () => {
  console.log("Server corriendo en puerto 3000");
});
