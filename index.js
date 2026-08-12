require("dotenv").config();

const express = require("express");
const hbs = require("hbs");
const path = require("path");

const logger = require("./middlewares/logger");
const routes = require("./routes/routes");

const app = express();

const PORT = process.env.PORT || 3000;


// ============================
// CONFIGURACIÓN HANDLEBARS
// ============================

app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "views"));

hbs.registerPartials(
    path.join(__dirname, "views", "partials")
);

hbs.registerHelper("mayusculas", function(texto) {
    return texto ? texto.toUpperCase() : "ERROR";
});


// ============================
// MIDDLEWARES
// ============================

app.use(express.static("public"));

app.use(logger);


// ============================
// RUTAS
// ============================

app.use("/", routes);


// ============================
// INICIAR SERVIDOR
// ============================

app.listen(PORT, () => {
    console.log("\n=== Servidor iniciado ===");
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});