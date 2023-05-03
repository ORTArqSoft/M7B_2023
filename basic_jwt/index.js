const jwt = require("jsonwebtoken");

// Función para generar un token JWT
function generarToken(payload) {
  const claveSecreta = "miClaveSecreta123"; // esta clave debería ser secreta y estar almacenada en un lugar seguro
  const opciones = { expiresIn: "1h" }; // el token expirará en una hora
  const token = jwt.sign(payload, claveSecreta, opciones);
  return token;
}

// Función para verificar un token JWT
function verificarToken(token) {
  const claveSecreta = "miClaveSecreta123"; // esta clave debería ser secreta y estar almacenada en un lugar seguro
  try {
    const payload = jwt.verify(token, claveSecreta);
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
