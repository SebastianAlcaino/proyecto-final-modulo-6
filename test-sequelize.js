const sequelize = require("./config/sequelize");

async function probarConexion() {

    try {

        await sequelize.authenticate();

        console.log("✅ Conexión exitosa con Sequelize");

    } catch (error) {

        console.error("❌ Error de conexión con Sequelize:");
        console.error(error.message);

    } finally {

        await sequelize.close();
    }
}

probarConexion();