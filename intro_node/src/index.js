const express = require("express");
const weather = require("./utils/weather.js");
const app = express();
const port = 3000;

//1
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//2
app.get("/help", (req, res) => {
  res.send("<h1>Help!</h1>");
});

//2
app.get("/about", (req, res) => {
  res.send({
    name: "Marco",
    age: 23,
  });
});

//3

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "You must provide an address" });
  }
  weather(req.query.address, (error, data) => {
    if (error) {
      res.send({ error });
    } else {
      res.send({ data });
    }
  });
});

//1
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
