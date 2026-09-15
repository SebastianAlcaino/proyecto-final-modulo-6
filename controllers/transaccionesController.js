const connection = require("../db");

const transaccionUsuario = async (req, res) => {

    const conexion = await connection.getConnection();

    try {

        await conexion.beginTransaction();

        // console.log("🔄 Transacción iniciada");

        // Primera acción
        await conexion.execute(
            "UPDATE usuarios SET nombre = ? WHERE user_id = ?",
            ["Nombre temporal", 1]
        );

        // console.log("✅ Primera acción realizada");

        // Segunda acción
        await conexion.execute(
            "UPDATE usuarios SET email = ? WHERE user_id = ?",
            ["correo_temporal@email.com", 1]
        );

        // console.log("✅ Segunda acción realizada");

        // Confirmamos ambas operaciones
        await conexion.commit();

        // // console.log("✅ Transacción completada correctamente");

        res.json({
            mensaje: "Transacción completada correctamente"
        });

    } catch (error) {

        await conexion.rollback();

        // console.error("❌ Error en la transacción:", error.message);
        // // console.log("↩️ ROLLBACK ejecutado correctamente");

        res.status(500).json({
            error: "La transacción falló. Se realizó rollback."
        });

    } finally {

        conexion.release();
    }
};

const transaccionUsuarioFallida = async (req, res) => {

    const conexion = await connection.getConnection();

    try {

        await conexion.beginTransaction();

        console.log("🔄 Transacción iniciada");

        // Primera acción
        await conexion.execute(
            "UPDATE usuarios SET nombre = ? WHERE user_id = ?",
            ["Nombre temporal ERROR", 1]
        );

        // console.log("✅ Primera acción realizada");

        // Segunda acción
        await conexion.execute(
            "UPDATE usuarios SET campoInexistente = ? WHERE user_id = ?",
            ["correo_temporal_ERROR@email.com", 1]
        );

        console.log("❌ Segunda acción fallida");

        // Confirmamos ambas operaciones
        await conexion.commit();

        // console.log("✅ Transacción completada correctamente");

        res.json({
            mensaje: "Transacción completada correctamente"
        });

    } catch (error) {

        await conexion.rollback();

        console.error("❌ Error en la transacción:", error.message);
        console.log("↩️ ROLLBACK ejecutado correctamente");


        res.status(500).json({
            error: "La transacción falló. Se realizó rollback."
        });

    } finally {

        conexion.release();
    }
};


module.exports = {
    transaccionUsuario,
    transaccionUsuarioFallida
};