const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "..", "logs", "events.log");

const logger = (req, res, next) => {
    const fecha = new Date().toLocaleString();

    const mensaje = `[${fecha}] | Petición: ${req.method} ${req.url}\n`;

    fs.appendFile(logFile, mensaje, (err) => {
        if (err) {
            console.error("Error al guardar el log de la petición:", err);
        }
    });

    next();
};

module.exports = logger;