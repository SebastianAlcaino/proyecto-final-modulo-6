const express = require("express");

const router = express.Router();

const { mostrarHome } = require("../controllers/homeController");
const { obtenerStatus } = require("../controllers/statusController");
const {
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario
} = require("../controllers/usuariosController.js");

const { transaccionUsuario,
    transaccionUsuarioFallida
} = require("../controllers/transaccionesController.js");

const { obtenerUsuariosORM,obtenerUsuariosConPedidos } = require("../controllers/userControllerSequelize.js");

router.get("/", (req, res) => {
    res.send("<h1>¡Hola Sebastián!</h1>");
});

router.get("/home", mostrarHome);

router.get("/status", obtenerStatus);

router.get("/usuarios", obtenerUsuarios);

router.put("/usuarios/:id", actualizarUsuario);

router.delete("/usuarios/:id", eliminarUsuario);

router.post("/transacciones/", transaccionUsuario);

router.put("/transacciones/fallida", transaccionUsuarioFallida);

router.get("/usuariosORM", obtenerUsuariosORM);

router.get("/usuarios-pedidos", obtenerUsuariosConPedidos);

module.exports = router;