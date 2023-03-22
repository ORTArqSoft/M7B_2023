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
    .then((apiResponse) => {
      res.send(apiResponse?.data);
    })
    .catch((error) => res.send({ error }));
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
