const express = require("express");

const router = express.Router();

const { mostrarHome } = require("../controllers/homeController");
const { obtenerStatus } = require("../controllers/statusController");

router.get("/", (req, res) => {
    res.send("<h1>¡Hola Sebastián!</h1>");
});

router.get("/home", mostrarHome);

router.get("/status", obtenerStatus);

module.exports = router;