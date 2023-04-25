const express = require("express");
const {
  dwalletBaseUrl,
  dwalletLoginEndpoint,
  dwalletRegisterEndpoint,
  dwalletCashierEndpoint,
  dwalletMovementsEndpoint,
} = require("./utils/endpoints.js");
const app = express();
const port = 3000;
const axios = require("axios");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/dwallet", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión exitosa a la base de datos"))
  .catch((err) => console.log("Error al conectarse a la base de datos: ", err));

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  idDepartment: Number,
  idCity: Number,
});

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// New line to support send a body
app.use(express.json());

app.post("/register", (req, res) => {
  if (
    !req.body?.usuario ||
    !req.body?.password ||
    !req.body?.idDepartamento ||
    !req.body?.idCiudad
  ) {
    //We will improve this error to have status codes and logging
    res.send({ error: "You must the user information" });
  }
  axios
    .post(`${dwalletBaseUrl}${dwalletRegisterEndpoint}`, req.body)
    .then(async (apiResponse) => {
      const newUser = new User({
        userName: req.body.usuario,
        password: req.body.password,
        idDepartment: req.body.idDepartamento,
        idCity: req.body.idCiudad,
      });
      await newUser
        .save()
        .then(() => console.log("Documento guardado exitosamente"))
        .catch((err) => console.log("Error al guardar el documento: ", err));
      res.send(apiResponse?.data);
    })
    .catch((error) => {
      console.log("error", error);
      res.send({ error });
    });
});

app.post("/login", (req, res) => {
  if (!req.body?.usuario || !req.body?.password) {
    res.send({ error: "You must provide a user" });
  }
  axios
    .post(`${dwalletBaseUrl}${dwalletLoginEndpoint}`, {
      usuario: req.body.usuario,
      password: req.body.password,
    })
    .then((apiResponse) => {
      res.send(apiResponse?.data);
    })
    //We will improve this error to have status codes and logging
    .catch((error) => res.send({ error }));
});

app.get("/cashiers", (req, res) => {
  axios
    .get(`${dwalletBaseUrl}${dwalletCashierEndpoint}`)
    .then((apiResponse) => {
      res.send(apiResponse?.data);
    })
    //We will improve this error to have status codes and logging
    .catch((error) => res.send({ error }));
});

app.post("/movements", (req, res) => {
  if (
    !req.body?.idUsuario ||
    !req.body?.concepto ||
    !req.body?.categoria ||
    !req.body?.total ||
    !req.body?.medio ||
    !req.body?.fecha
  ) {
    //We will improve this error to have status codes and logging
    res.send({ error: "You must provide the movement information" });
  }
  axios
    .post(`${dwalletBaseUrl}${dwalletMovementsEndpoint}`, req.body, {
      headers: {
        apiKey: req.headers.apikey,
      },
    })
    .then((apiResponse) => {
      res.send(apiResponse?.data);
    })
    .catch((error) => {
      res.send({ error });
    });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
