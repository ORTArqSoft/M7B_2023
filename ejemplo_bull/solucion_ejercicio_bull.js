const express = require('express');
const Queue = require('bull');

const app = express();
const miCola = new Queue('cola-emails-process');

// ejecuta tarea en segundo plano
miCola.process(async (job,done) => {
  console.log(`Procesando tarea ${job.id}...`);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  done();
  console.log(`Tarea ${job.id} completada -> email ${job.data.email} enviado`);
});

// agregará una tarea a la cola
app.get('/add/:email', async (req, res) => {
  const job = await miCola.add({ email: req.params.email });
  res.send(`Tarea agregada tarea con ID:${job.id} y email ${req.params.email}`);
});

// mostrará el estado de una tarea
app.get('/show/:id', async (req, res) => {
  const job = await miCola.getJob(req.params.id);
  if (!job) {
    res.status(404).send('Tarea no encontrada');
    return;
  }
  res.send(`Tarea ${job.id} asociado al mail ${job.data.email}`);
});

// mostrará todas las tareas en la cola
app.get('/all', async (req, res) => {
  const jobs = await miCola.getJobs();
  const tareas = jobs.map((job) => ({
    id: job.id,
    email: job.data.email,
  }));
  res.send(tareas);
});

// eventos
miCola.on("completed", (job) => {
  // job.id contiene id de este job.
  console.log(`job ${job.id} completed ${mensaje}`);
});

miCola.on("failed", (job) => {
  console.log(`job ${job.id} failed, ${job.failedReason}`);
});

miCola.on("active", (job) => {
  console.log(`job ${job.id} active`);
});

// Escucha en el puerto 3000
app.listen(3000, () => {
  console.log('Aplicación en ejecución en http://localhost:3000');
});
