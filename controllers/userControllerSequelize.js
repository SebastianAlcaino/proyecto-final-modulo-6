const { User, Pedido } = require("../models/associations");


const obtenerUsuariosORM = async (req, res) => {

    try {

        const usuarios = await User.findAll({
            attributes: ["user_id", "nombre", "email"]
        });

        res.json(usuarios);

    } catch (error) {

        console.error("❌ Error con Sequelize:", error.message);

        res.status(500).json({
            error: "Error al obtener usuarios"
        });
    }
};


const obtenerUsuariosConPedidos = async (req, res) => {

    try {

        const usuarios = await User.findAll({
            attributes: [
                "user_id",
                "nombre",
                "email"
            ],

            include: [
                {
                    model: Pedido,
                    as: "pedidos",
                    attributes: [
                        "pedido_id",
                        "producto",
                        "fecha_pedido",
                        "cantidad",
                        "total"
                    ]
                }
            ]
        });

        res.json(usuarios);

    } catch (error) {

        console.error(
            "❌ Error al obtener usuarios con pedidos:",
            error.message
        );

        res.status(500).json({
            error: "Error al obtener usuarios con pedidos",
            message: error.message
        });
    }
};


module.exports = {
    obtenerUsuariosORM,
    obtenerUsuariosConPedidos
};