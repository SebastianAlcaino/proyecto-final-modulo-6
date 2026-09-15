const fs = require("fs");
const path = require("path");

const EndpointsLog = path.join(__dirname, "..", "logs", "events.log");
const TransaccionesLog = path.join(__dirname, "..", "logs", "transacciones.log");
const TransaccionesFallidasLog = path.join(
    __dirname,
    "..",
    "logs",
    "transaccionesFallidas.log"
);

const endpointLogger = (req, res, next) => {
    const fecha = new Date().toLocaleString();

    const mensaje = `[${fecha}] | Petición: ${req.method} ${req.url}\n`;

    fs.appendFile(EndpointsLog, mensaje, (err) => {
        if (err) {
            console.error("Error al guardar el log de la petición:", err);
        }
    });

    next();
};


const transaccionLogger = (req, res, next) => {

    res.on("finish", () => {

    const fecha = new Date().toLocaleString();

    if (req.method !== "POST" && req.method !== "PUT") {
        return;
    }

    if (!req.url.startsWith("/transacciones")) {
        return;
    }

    if (res.statusCode >= 400) {

        const mensajeError =
            `❌ [${fecha}] | Transacción: ${req.method} ${req.url} | Estado: ${res.statusCode}\n`;

        fs.appendFile(TransaccionesFallidasLog, mensajeError, (err) => {
            if (err) {
                console.error("Error al guardar el log de transacción fallida:", err);
            }
        });

    } else {

        const mensaje =
            `✅ [${fecha}] | Transacción: ${req.method} ${req.url} | Estado: ${res.statusCode}\n`;

        fs.appendFile(TransaccionesLog, mensaje, (err) => {
            if (err) {
                console.error("Error al guardar el log de la transacción:", err);
            }
        });
    }
});

    next();
};


module.exports = {
    endpointLogger,
    transaccionLogger
};