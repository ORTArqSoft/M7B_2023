const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("./private.key");
const publicKey = fs.readFileSync("./public.key");

// Función para generar un token JWT
function generarToken(payload) {
  const opciones = { expiresIn: "1s", algorithm: "RS256" }; // el token expirará en una hora
  const token = jwt.sign(payload, privateKey, opciones);
  return token;
}

// Función para verificar un token JWT
function verificarToken(token) {
  try {
    const payload = jwt.verify(token, publicKey);
    return payload;
  } catch (error) {
    console.log("Token no válido");
    return null;
  }
}

// Ejemplo de generación y verificación de tokens JWT
const token = generarToken({ userId: 123 });
console.log("Token generado:", token);

const payload = verificarToken(token);
if (payload) {
  console.log("Token válido");
  console.log("Payload:", payload);
}

console.log("-----");

console.log("Verificar token corrupto");
verificarToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiaWF0IjoxNjgzMTE2MDA4LCJleHAiOjE2ODMxMTYwMDl9.29lAo1zacG6pM32fmbhE5h-lqFOaQLxXTmyTTWRSchp"
);
console.log("-----");

setTimeout(() => {
  console.log("Verificar token que no va ser válido");
  verificarToken(token);
  console.log("-----");
}, 2000);
