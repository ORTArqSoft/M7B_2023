const express = require("express");
const app = express();

app.post("/users", (req, res) => {
  console.log("Me llamé get /users");
  // create new user
});

app.get("/users/:userId", (req, res) => {
  // update user by ID
  console.log("Me llamé get /users:/userId");
});

app.put("/users/:userId", (req, res) => {
  // update user by ID
  console.log("Me llamé put /users:/userId");
});

app.delete("/users/:userId", (req, res) => {
  // delete user by ID
  console.log("Me llamé delete /users:/userId");
});

app.listen(3000, () => console.log("User service listening on port 3000!"));
