const User = require("./User");
const Pedido = require("./Pedido");

User.hasMany(Pedido, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    as: "pedidos",
    onUpdate: "CASCADE",
});

Pedido.belongsTo(User, {
    foreignKey: "user_id",
    as: "usuario",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = {
    User,
    Pedido
};