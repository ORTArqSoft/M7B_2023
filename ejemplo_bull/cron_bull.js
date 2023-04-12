const Bull = require("bull");
// queue name unique.
const Queue = new Bull("queue-test");
// productor.
// por defecto los jobs siguen arquitectura FIFO. Se puede modificar en las Queue Options.

const jobs = [
  {
    nombre: "job 1",
    status: "error",
  },
  {
    nombre: "job 2",
    status: "mensaje",
  },
  {
    nombre: "job 3",
    status: "ok",
  },
];

jobs.forEach(function (job) {
  Queue.add(job);
});

// consumidor.
// done callback para notificar si el job se hace correctamente o no => escuchar el evento.
// si no lo invoco, bull deja job actual como activo y el siguiente job waiting.
Queue.process((job, done) => {
  // job.data contiene los datos personalizados cuando se creó el job.
  if (job.data.status == "ok") {
    done();
  }
  if (job.data.status == "mensaje") {
    done(null, { mensaje: "done..." });
  }
  if (job.data.status == "error") {
    done(new Error("hubo un error..."));
  }
});

// eventos
Queue.on("completed", (job) => {
  const mensaje = job.returnvalue.mensaje ? job.returnvalue.mensaje : "";
  // job.id contiene id de este job.
  console.log(`job ${job.id} completed ${mensaje}`);
});

Queue.on("failed", (job) => {
  console.log(`job ${job.id} failed, ${job.failedReason}`);
});

Queue.on("active", (job) => {
  console.log(`job ${job.id} active`);
});
