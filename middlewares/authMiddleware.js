const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        // ============================
        // COMPROBAR HEADER
        // ============================

        if (!authHeader) {
            return res.status(401).json({
                error: "Token no proporcionado"
            });
        }

        // ============================
        // OBTENER TOKEN
        // ============================

        const partes = authHeader.split(" ");

        if (partes.length !== 2 || partes[0] !== "Bearer") {
            return res.status(401).json({
                error: "Formato de token inválido"
            });
        }

        const token = partes[1];

        // ============================
        // VERIFICAR TOKEN
        // ============================

        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Guardamos información del usuario
        // para utilizarla posteriormente

        req.usuario = usuario;

        next();

    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                error: "El token ha expirado"
            });
        }

        return res.status(401).json({
            error: "Token inválido"
        });
    }
};

module.exports = {
    verificarToken
};