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
const Sequelize = require("sequelize");
const mysql = require("mysql2");

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

//MySql connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
});

// Run create database statement
connection.query(
  `CREATE DATABASE IF NOT EXISTS movementsDb`,
  function (err, results) {
    console.log(results);
    console.log(err);
  }
);

// Close the connection
connection.end();

// Define la configuración de la base de datos
const sequelize = new Sequelize("movementsDb", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

// Define el modelo de la entidad que quieres crear
const Movement = sequelize.define("movement", {
  idUser: Sequelize.INTEGER,
  concept: Sequelize.STRING,
  category: Sequelize.INTEGER,
  total: Sequelize.INTEGER,
  medium: Sequelize.STRING,
  date: Sequelize.STRING,
});

// Crea la base de datos e inserta información de prueba si es necesario
sequelize.sync().then(() => {
  Movement.create({
    idUser: 3,
    concept: "Gasto en cosas 2",
    category: 4,
    total: 10,
    medium: "Efectivo",
    date: "2022-09-29",
  });
});

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
      Movement.create({
        idUser: req.body.idUsuario,
        concept: req.body.concepto,
        category: req.body.categoria,
        total: req.body.total,
        medium: req.body.medio,
        date: req.body.fecha,
      }).then((entity) => {
        console.log("Movimiento insertado correctamente", entity);
      });
      res.send(apiResponse?.data);
    })
    .catch((error) => {
      res.send({ error });
    });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
