const path = require("path");
const { User } = require("../models/associations");

const subirArchivo = async (req, res) => {
    try {

        // ============================
        // 1. OBTENER ID DEL USUARIO
        // ============================

        const { id } = req.params;


        // ============================
        // 2. COMPROBAR ARCHIVO
        // ============================

        if (!req.files || !req.files.archivo) {
            return res.status(400).json({
                error: "No se recibió ningún archivo"
            });
        }

        const archivo = req.files.archivo;


        // ============================
        // 3. VALIDAR EXTENSIÓN
        // ============================

        const extensionesPermitidas = [
            ".jpg",
            ".jpeg",
            ".png"
        ];

        const extension = path.extname(archivo.name).toLowerCase();

        if (!extensionesPermitidas.includes(extension)) {
            return res.status(400).json({
                error: "Tipo de archivo no permitido"
            });
        }


        // ============================
        // 4. BUSCAR USUARIO CON SEQUELIZE
        // ============================

        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }


        // ============================
        // 5. CREAR NOMBRE DEL ARCHIVO
        // ============================

        const nombreArchivo =
            Date.now() + "-" + archivo.name;


        // ============================
        // 6. DEFINIR RUTA DE DESTINO
        // ============================

        const rutaDestino = path.join(
            __dirname,
            "..",
            "uploads",
            nombreArchivo
        );


        // ============================
        // 7. GUARDAR ARCHIVO FÍSICO
        // ============================

        await archivo.mv(rutaDestino);


        // ============================
        // 8. ACTUALIZAR USUARIO CON SEQUELIZE
        // ============================

        await usuario.update({
            foto: nombreArchivo
        });


        // ============================
        // 9. RESPUESTA
        // ============================

        res.status(201).json({
            mensaje: "Archivo subido y asociado correctamente",
            usuario_id: usuario.user_id,
            nombre_usuario: usuario.nombre,
            foto: usuario.foto,
            url: `${process.env.BASE_URL}/uploads/${nombreArchivo}`
        });

    } catch (error) {

        console.error("❌ Error al subir archivo:", error.message);

        res.status(500).json({
            error: "Error al subir el archivo"
        });
    }
};

module.exports = {
    subirArchivo
};