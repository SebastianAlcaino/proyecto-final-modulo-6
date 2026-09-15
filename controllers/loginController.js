const jwt = require("jsonwebtoken");
const connection = require("../db");

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // ============================
        // VALIDAR DATOS
        // ============================

        if (!email || !password) {
            return res.status(400).json({
                error: "Email y password son obligatorios"
            });
        }

        // ============================
        // BUSCAR USUARIO
        // ============================

        const [usuarios] = await connection.execute(
            `SELECT user_id, nombre, email, password
             FROM usuarios
             WHERE email = ?`,
            [email]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                error: "Credenciales incorrectas"
            });
        }

        const usuario = usuarios[0];

        // ============================
        // VALIDAR PASSWORD
        // ============================

        if (password !== usuario.password) {
            return res.status(401).json({
                error: "Credenciales incorrectas"
            });
        }

        // ============================
        // GENERAR JWT
        // ============================

        const token = jwt.sign(
            {
                user_id: usuario.user_id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1m"
            }
        );

        // ============================
        // RESPUESTA
        // ============================

        res.json({
            mensaje: "Login exitoso",
            token: token
        });

    } catch (error) {

        console.error("❌ Error en login:", error.message);

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};

module.exports = {
    login
};