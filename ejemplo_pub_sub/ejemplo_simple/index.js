const express = require("express");
const app = express();
const events = require("events");

// Crear un objeto EventEmitter para manejar los eventos
const eventEmitter = new events.EventEmitter();

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Suscribirse a un evento específico
app.post("/subscribe/:event", (req, res) => {
  const event = req.params.event;

  // Agregar el cliente actual como suscriptor al evento
  eventEmitter.on(event, (data) => {
    console.log("me llame");
    res.json(data);
  });

  res.send("Suscripción exitosa");
});

// Publicar un evento
app.post("/publish/:event", async (req, res) => {
  const event = req.params.event;

  // Emitir el evento y pasar los datos
  await eventEmitter.emit(event);

  res.send("Publicación exitosa");
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
