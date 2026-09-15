const connection = require("../db");

const obtenerUsuarios = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const offset = (page - 1) * limit;

        console.log("page:", page);
        console.log("limit:", limit);
        console.log("offset:", offset);
        console.log(5 + "5");

        const [usuarios] = await connection.query(
            `SELECT user_id, nombre, email
             FROM usuarios
             LIMIT ${limit} OFFSET ${offset}`
        );

        res.json(usuarios);

    } catch (error) {

        console.error("❌ Error:", error.message);

        res.status(500).json({
            error: "Error al obtener usuarios"
        });
    }
};

const actualizarUsuario = async (req, res) => {

    try {

        const { id } = req.params;
        const { nombre, email, fecha_nacimiento } = req.body;

        const [resultado] = await connection.execute(
            `UPDATE usuarios
             SET nombre = ?, email = ?, fecha_nacimiento = ?
             WHERE user_id = ?`,
            [nombre, email, fecha_nacimiento, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        res.json({
            mensaje: "Usuario actualizado correctamente"
        });

    } catch (error) {

        console.error("❌ Error:", error.message);

        res.status(500).json({
            error: "Error al actualizar el usuario"
        });
    }
};

const eliminarUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        const [resultado] = await connection.execute(
            "DELETE FROM usuarios WHERE user_id = ?",
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        res.json({
            mensaje: "Usuario eliminado correctamente"
        });

    } catch (error) {

        console.error("❌ Error:", error.message);

        res.status(500).json({
            error: "Error al eliminar el usuario"
        });
    }
};

const crearUsuario = async (req, res) => {

    try {

        const { nombre, email, password, fecha_nacimiento } = req.body;

        const [resultado] = await connection.execute(
            `INSERT INTO usuarios
             (nombre, email, password, fecha_nacimiento)
             VALUES (?, ?, ?, ?)`,
            [nombre, email, password, fecha_nacimiento]
        );

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            user_id: resultado.insertId
        });

    } catch (error) {

        console.error("❌ Error:", error.message);

        res.status(500).json({
            error: "Error al crear el usuario"
        });
    }
};



module.exports = {
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario,
    crearUsuario
};      
