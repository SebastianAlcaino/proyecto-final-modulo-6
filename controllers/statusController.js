const obtenerStatus = (req, res) => {
    res.json({ 
        status: "OK",
        server: "Express",
        serverVersion: process.version,
        serverTime: new Date().toISOString(),
        message: "¡Hola Usuario! Bienvenido a mi servidor con Express."
    });
};

module.exports = {
    obtenerStatus
};