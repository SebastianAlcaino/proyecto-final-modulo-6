const express = require("express");

const router = express.Router();
const { verificarToken } = require("../middlewares/authMiddleware");

const { mostrarHome } = require("../controllers/homeController");
const { obtenerStatus } = require("../controllers/statusController");
const {
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario,
    crearUsuario
} = require("../controllers/usuariosController.js");
const { transaccionUsuario,
    transaccionUsuarioFallida
} = require("../controllers/transaccionesController.js");
const { obtenerUsuariosORM,obtenerUsuariosConPedidos } = require("../controllers/userControllerSequelize.js");
const  { subirArchivo }  = require("../controllers/uploadController");
const { login } = require("../controllers/loginController");

router.get("/", (req, res) => {
    res.send("<h1>¡Hola Sebastián!</h1>");
});

router.get("/home", mostrarHome);

router.get("/status", obtenerStatus);

router.get("/usuarios", verificarToken, obtenerUsuarios);

router.put("/usuarios/:id", actualizarUsuario);

router.delete("/usuarios/:id", eliminarUsuario);

router.post("/usuarios", crearUsuario);

router.post("/transacciones/", transaccionUsuario);

router.put("/transacciones/fallida", transaccionUsuarioFallida);

router.get("/usuariosORM", verificarToken, obtenerUsuariosORM);

router.get("/usuarios-pedidos", obtenerUsuariosConPedidos);

router.post("/upload/:id", subirArchivo);

router.post("/login", login);

module.exports = router;