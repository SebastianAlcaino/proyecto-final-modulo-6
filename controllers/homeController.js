const mostrarHome = (req, res) => {
    const cursos = ["Node.js", "Express", "Handlebars", "MongoDB"];

    res.render("home", {
        titulo: "Mi Servidor con Handlebars",
        nombre: "Sebastián",
        primerCurso: cursos[0],
        cursos
    });
};

module.exports = {
    mostrarHome
};