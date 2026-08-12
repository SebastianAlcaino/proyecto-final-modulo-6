# 🚀 Proyecto Final — Servidor Express

Proyecto final desarrollado durante el curso de JavaScript Full Stack. El objetivo es construir un servidor utilizando **Node.js y Express**, aplicando una estructura modular y buenas prácticas de organización del código.

## 📋 Descripción

Este proyecto implementa un servidor web desarrollado con Express que incluye:

* Servidor HTTP con Express.
* Variables de entorno mediante `dotenv`.
* Nodemon para facilitar el desarrollo.
* Archivos estáticos mediante `express.static()`.
* Motor de plantillas Handlebars.
* Rutas separadas de la lógica de negocio.
* Controllers para gestionar las respuestas.
* Middleware personalizado para registrar solicitudes.
* Sistema de logs.
* Endpoint de estado del servidor mediante JSON.
* Vistas dinámicas con Handlebars.
* Helpers y partials de Handlebars.

## 🛠️ Tecnologías utilizadas

* Node.js
* Express
* Handlebars
* hbs
* dotenv
* Nodemon
* JavaScript
* HTML
* Git
* GitHub

## 📁 Estructura del proyecto

```text
Proyecto-final-de-modulo/
│
├── controllers/
│   ├── homeController.js
│   └── statusController.js
│
├── middlewares/
│   └── logger.js
│
├── routes/
│   └── routes.js
│
├── public/
│
├── logs/
│   └── events.log
│
├── views/
│   ├── home.hbs
│   └── partials/
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/SebastianAlcaino/proyecto-final-modulo-6.git
```

Ingresar al directorio:

```bash
cd proyecto-final-modulo-6
```

Instalar las dependencias:

```bash
npm install
```

## 🔐 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
```

## ▶️ Ejecución

### Modo desarrollo

Para ejecutar el servidor utilizando Nodemon:

```bash
npm run dev
```

### Modo normal

Para ejecutar el servidor con Node.js:

```bash
npm start
```

El servidor estará disponible en:

```text
http://localhost:3000
```

## 🌐 Rutas disponibles

### GET `/`

Entrega la página principal del servidor.

```text
GET http://localhost:3000/
```

### GET `/home`

Renderiza la vista `home` utilizando Handlebars y entrega información dinámica sobre los cursos.

```text
GET http://localhost:3000/home
```

### GET `/status`

Entrega información sobre el estado del servidor en formato JSON.

```text
GET http://localhost:3000/status
```

Ejemplo de respuesta:

```json
{
  "status": "OK",
  "server": "Express",
  "serverVersion": "v22.x.x",
  "serverTime": "2026-08-11T00:00:00.000Z",
  "message": "¡Hola Usuario! Bienvenido a mi servidor con Express."
}
```

## 🧩 Arquitectura

El proyecto utiliza una separación básica de responsabilidades:

### Routes

Define los endpoints disponibles y conecta cada ruta con su controller correspondiente.

### Controllers

Contienen la lógica necesaria para procesar las solicitudes y construir las respuestas.

### Middlewares

Contienen funciones que se ejecutan durante el procesamiento de las solicitudes. Actualmente se utiliza un middleware personalizado para registrar las peticiones recibidas.

### Public

Contiene los archivos estáticos del proyecto, como HTML, CSS, JavaScript e imágenes.

### Logs

Almacena los registros generados por el middleware de logging.

### Views

Contiene las plantillas utilizadas por Handlebars para generar contenido HTML dinámico.

## 📝 Logging

El servidor registra las solicitudes recibidas mediante un middleware personalizado.

Los registros se almacenan en:

```text
logs/events.log
```

Cada registro contiene información como:

```text
[11/8/2026, 21:30:00] | Petición: GET /status
```

## 📚 Objetivos de aprendizaje

Este proyecto permitió aplicar conceptos fundamentales de desarrollo backend con Node.js y Express:

* Creación y configuración de un servidor Express.
* Uso de middleware.
* Creación de rutas.
* Separación de rutas y controllers.
* Manejo de variables de entorno.
* Uso de motores de plantillas.
* Renderizado dinámico con Handlebars.
* Creación de endpoints JSON.
* Manejo de archivos y logs.
* Organización modular de un proyecto Node.js.
* Uso de Git y GitHub.

## 👨‍💻 Autor

**Sebastián Alcaíno**

Proyecto desarrollado como parte del curso de JavaScript Full Stack.
