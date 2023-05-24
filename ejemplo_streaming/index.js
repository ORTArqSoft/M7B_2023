const http = require("http");
const fs = require("fs");

http
	.createServer((req, res) => {
		const videoPath = "uploads/road.mp4"; // Ruta al archivo de video que deseas transmitir

		fs.stat(videoPath, (err, stats) => {
			if (err) {
				console.error("Error al leer el archivo de video:", err);
				res.writeHead(500, { "Content-Type": "text/plain" });
				res.end("Error interno del servidor");
				return;
			}

			// Configurar encabezados para indicar que se transmitirá un video
			res.writeHead(200, {
				"Content-Type": "video/mp4",
				"Content-Length": stats.size,
			});

			// Crear un flujo de lectura del archivo de video
			const videoStream = fs.createReadStream(videoPath);

			// Transmitir el video a medida que se va leyendo
			videoStream.pipe(res);

			// Manejar evento de error de transmisión
			videoStream.on("error", (err) => {
				console.error("Error al transmitir el video:", err);
				res.sendStatus(500);
			});
		});
	})
	.listen(3300, () => {
		console.log("Servidor de streaming de video iniciado en el puerto 3300");
	});