const redis = require("redis");
const client = redis.createClient();

client.on("connect", function () {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.error("Error de conexión a Redis:", err);
});

const basicExample = async () => {
  await client.connect();

  await client.set("testKey", "Primer ejemplo de redis", (err, reply) => {
    if (err) {
      console.log("Error al establecer el valor en Redis:", err);
    } else {
      console.log("Valor establecido en Redis:", reply);
    }
  });

  client.disconnect();
};

basicExample();
