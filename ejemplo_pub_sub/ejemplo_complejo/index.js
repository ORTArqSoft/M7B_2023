const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost/eventdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

// Definición del esquema y modelo para los eventos
const eventSchema = new mongoose.Schema({
  eventId: String,
  event: String,
  data: Object,
});
const Event = mongoose.model('Event', eventSchema);

// Clase para el sistema de publicación y suscripción
class PubSub {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }

    const subscriberId = uuidv4();
    this.subscribers[event].push({ id: subscriberId, callback });

    return subscriberId;
  }

  unsubscribe(event, subscriberId) {
    if (this.subscribers[event]) {
      this.subscribers[event] = this.subscribers[event].filter(subscriber => subscriber.id !== subscriberId);
    }
  }

  publish(event, data) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(subscriber => {
        subscriber.callback(data);
      });
    }

    // Guardar el evento en la base de datos
    const newEvent = new Event({ eventId: uuidv4(), event, data });
    newEvent.save((error) => {
      if (error) {
        console.error('Error al guardar el evento en la base de datos:', error);
      } else {
        console.log('Evento guardado en la base de datos');
      }
    });
  }
}

// Crear una instancia del sistema de publicación y suscripción
const pubsub = new PubSub();

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Suscribirse a un evento específico
app.post('/subscribe/:event', (req, res) => {
  const event = req.params.event;

  const subscriberId = pubsub.subscribe(event, (data) => {
    res.json(data);
  });

  res.send(`Suscripción exitosa. ID del suscriptor: ${subscriberId}`);
});

// Cancelar la suscripción a un evento
app.post('/unsubscribe/:event/:subscriberId', (req, res) => {
  const event = req.params.event;
  const subscriberId = req.params.subscriberId;

  pubsub.unsubscribe(event, subscriberId);

  res.send('Suscripción cancelada correctamente');
});

// Publicar un evento
app.post('/publish/:event', (req, res) => {
  const event = req.params.event;
  const data = req.body;

  pubsub.publish(event, data);

  res.send('Publicación exitosa');
});

// Obtener todos los eventos almacenados en la base de datos
app.get('/events', (req, res) => {
  Event.find({}, (error, events) => {
    if (error) {
      console.error('Error al obtener los eventos de la base de datos:', error);
      res.status(500).json({ error: 'Error al obtener los eventos' });
    } else {
      res.json(events);
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
