const redis = require("redis");
const client = redis.createClient();

client.on("connect", function () {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.error("Error de conexión a Redis:", err);
});

client.connect();

function agregarTarea(tarea) {
  client.lPush("tareas", tarea, (err, reply) => {
    if (err) {
      console.error("Error al agregar tarea:", err);
    } else {
      console.log("Tarea agregada:", tarea);
    }
  });
}

function obtenerTareas() {
  client.lRange("tareas", 0, -1, (err, reply) => {
    if (err) {
      console.error("Error al obtener tareas:", err);
    } else {
      console.log("Tareas:", reply);
    }

    client.quit();
  });
}

agregarTarea("Hacer la compra");
agregarTarea("Pasear al perro");
agregarTarea("Estudiar Node.js");

obtenerTareas();
