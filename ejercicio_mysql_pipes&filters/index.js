const axios = require("axios");
const Pipeline = require("pipes-and-filters");
const pipeline = Pipeline.create("validación teléfono");
require("dotenv").config();
const API_KEY = process.env.API_KEY;

const express = require("express");
const app = express();
const port = 3000;

// MYSQL
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:secret@localhost:3306/phoneDb");
const mysql = require("mysql2");
class Phone extends Sequelize.Model {
  static start() {
    let attribues = {
      number: Sequelize.STRING,
    };
    let options = {
      sequelize,
      modelName: "phone",
    };
    this.init(attribues, options);
  }
}

Phone.start();

(async () => {
  // Open the connection to MySQL server
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "secret",
  });

  // Run create database statement
  connection.query(
    `CREATE DATABASE IF NOT EXISTS phoneDb`,
    function (err, results) {
      console.log(results);
      console.log(err);
    }
  );

  // Close the connection
  connection.end();

  await sequelize.sync();
  let phone = await Phone.create({
    number: "095041136",
  });
  console.log(phone.toJSON());
})();

// Filtros
let validar_digitos = function (input, next) {
  const pattern = /^(?:[+\d].*\d|\d)$/;
  if (!pattern.test(input)) {
    return next(Error("Formato no válido"));
  }
  next(null, input);
};

let validar_numero = function (input, next) {
  let config = {
    headers: {
      apikey: API_KEY,
    },
  };
  axios
    .get(
      `https://api.apilayer.com/number_verification/validate?number=${input}`,
      config
    )
    .then(function (response) {
      if (!response.data.valid) {
        return next(Error("Número no válido"));
      }
      // handle success
      next(null, input);
    });
};

let validar_registro = async function (input, next) {
  const phones = await Phone.findAll();

  if (phones.find((telefono) => telefono.number == input)) {
    return next(Error("Número registrado"));
  }
  next(null, input);
};

let grabar_telefono = async function (result) {
  console.log("result", result);

  Phone.create({
    number: result,
  }).then((entity) => {
    console.log("Número insertado correctamente", entity);
  });
};

//Endpoints
// New line to support send a body
app.use(express.json());

app.post("/phone", (req, res) => {
  if (!req.body?.number) {
    //We will improve this error to have status codes and logging
    res.send({ error: "You must provide the phone number" });
  }

  // pipeline
  pipeline.use(validar_digitos);
  pipeline.use(validar_numero);
  pipeline.use(validar_registro);
  pipeline.execute(req.body.number);

  // error handler, si hay error se corta la canalización.
  pipeline.once("error", function (err) {
    res.send({ error: err.toString() });
  });

  // end handler, para recibir una notificación cuando se complete la canalización.
  pipeline.once("end", function (result) {
    console.log("completado");
    grabar_telefono(result);
    res.send({
      status: 201,
      result,
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
