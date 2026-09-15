require("dotenv").config();

const express = require("express");
const hbs = require("hbs");
const path = require("path");
const connection = require("./db");
const sequelize = require("./config/sequelize");
const fileUpload = require("express-fileupload");

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

hbs.registerHelper("mayusculas", function (texto) {
    return texto ? texto.toUpperCase() : "ERROR";
});


// ============================
// MIDDLEWARES
// ============================

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(logger.endpointLogger);
app.use(logger.transaccionLogger);

app.use(express.json());
app.use(fileUpload());


// ============================
// RUTAS
// ============================

app.use("/", routes);


// ============================
// INICIAR CONEXIÓN A BASE DE DATOS
// ============================

async function iniciarConexionDB() {
    try {
        await connection.query("SELECT 1");

        console.log("Conexión exitosa a MySQL");

    } catch (error) {
        console.error("Error al conectar con MySQL:");
        console.error(error.message);
    }
}

iniciarConexionDB();


async function iniciarConexionSequelize() {
    try {
        await sequelize.authenticate();

        console.log("✅ Conexión exitosa con Sequelize");

    } catch (error) {
        console.error("❌ Error de conexión con Sequelize:");
        console.error(error.message);
    }
}
 
iniciarConexionSequelize();

app.listen(PORT, () => {
    console.log("\n=== Servidor iniciado ===");
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});