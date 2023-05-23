const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const events = require('events');

// Crear un objeto EventEmitter para manejar los eventos
const eventEmitter = new events.EventEmitter();

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Suscribirse a un evento específico
app.post('/subscribe/:event', (req, res) => {
  const event = req.params.event;

  // Agregar el cliente actual como suscriptor al evento
  eventEmitter.on(event, (data) => {
    res.json(data);
  });

  res.send('Suscripción exitosa');
});

// Publicar un evento
app.post('/publish/:event', (req, res) => {
  const event = req.params.event;
  const data = req.body;

  // Emitir el evento y pasar los datos
  eventEmitter.emit(event, data);

  res.send('Publicación exitosa');
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
