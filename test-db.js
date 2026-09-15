const connection = require("./db");

async function probarConexion() {

    try {

        const [usuarios] = await connection.execute(
            "SELECT * FROM usuarios"
        );

        console.log("✅ Conexión exitosa");
        console.log("Usuarios encontrados:");
        console.log(usuarios);

    } catch (error) {

        console.error("❌ Error de conexión:");
        console.error(error.message);

    } finally {

        await connection.end();

    }
}

probarConexion();