const express = require("express");
const app = express();

const Bull = require("bull");
const Arena = require("bull-arena");

// Crea una nueva cola de trabajos de Bull
const queue = new Bull("email-queue", {
  redis: { port: 6379, host: "127.0.0.1" },
});

// Agrega un trabajo a la cola de trabajos
const addJobToQueue = async (email) => {
  await queue.add({ email });
};

// Crea una tarea para enviar correos electrónicos
const sendEmail = async (job) => {
  console.log(`Enviando correo electrónico a: ${job.data.email}`);
  // Lógica para enviar el correo electrónico aquí
};

// Procesa los trabajos de la cola
queue.process(sendEmail);

// Configura Bull Arena
const arenaConfig = Arena({
  Bull,
  queues: [
    {
      name: "email-queue",
      hostId: "Queue Server",
      redis: {
        port: 6379,
        host: "127.0.0.1",
      },
    },
  ],
});

// Agrega la interfaz de Bull Arena a Express
app.use("/bull", arenaConfig);

// Agrega una ruta para encolar trabajos
app.get("/enqueue/:email", async (req, res) => {
  const email = req.params.email;
  await addJobToQueue(email);
  res.send(`Correo electrónico enviado a ${email}`);
});

// Inicia el servidor de Express
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en línea en el puerto ${PORT}`);
});
