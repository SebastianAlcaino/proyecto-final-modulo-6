const {DataTypes} = require("sequelize");
const sequelize = require("../config/sequelize");

const Pedido = sequelize.define(
    "Pedido",
    {
        pedido_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        producto: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        fecha_pedido: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        tableName: "pedidos",
        timestamps: false
    }
);


module.exports = Pedido;