# 🚀 Proyecto Final — Servidor Express

Proyecto final desarrollado durante el curso de **JavaScript Full Stack**. El objetivo es construir un servidor utilizando **Node.js, Express y MySQL**, aplicando una estructura modular, separación de responsabilidades y buenas prácticas de organización del código.

Durante el desarrollo se incorporaron progresivamente conceptos de backend, persistencia de datos, operaciones CRUD, transacciones, logging y acceso a bases de datos mediante **Sequelize ORM**.

---

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
* Conexión a base de datos MySQL.
* Operaciones CRUD sobre usuarios.
* Paginación de resultados.
* Manejo de transacciones con rollback.
* Registro de transacciones exitosas y fallidas.
* Implementación de Sequelize ORM.
* Modelos Sequelize para usuarios y pedidos.
* Relaciones entre modelos mediante `hasMany` y `belongsTo`.
* Consultas utilizando `include` para obtener usuarios y sus pedidos.

---

## 🛠️ Tecnologías utilizadas

* Node.js
* Express
* MySQL
* MySQL2
* Sequelize
* Handlebars
* hbs
* dotenv
* Nodemon
* JavaScript
* HTML
* Git
* GitHub

---

## 📁 Estructura del proyecto

```text
Proyecto-final-de-modulo/
│
├── config/
│   └── sequelize.js
│
├── controllers/
│   ├── homeController.js
│   ├── statusController.js
│   ├── transaccionesController.js
│   ├── userControllerSequelize.js
│   └── usuariosController.js
│
├── middlewares/
│   └── logger.js
│
├── models/
│   ├── User.js
│   ├── Pedido.js
│   └── associations.js
│
├── routes/
│   └── routes.js
│
├── public/
│
├── logs/
│
├── views/
│   ├── home.hbs
│   └── partials/
│
├── .env
├── .gitignore
├── db.js
├── index.js
├── package.json
├── package-lock.json
├── test-db.js
└── test-sequelize.js
```

> Los archivos `.log` generados durante la ejecución se encuentran excluidos del repositorio mediante `.gitignore`.

---

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

---

## 🔐 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_USER=usuario_mysql
DB_PASSWORD=contraseña_mysql
DB_NAME=ProyectoModulo7
```

Las credenciales de la base de datos se mantienen fuera del código fuente mediante variables de entorno.

El archivo `.env` se encuentra incluido en `.gitignore` y no debe ser subido al repositorio.

---

## 🗄️ Base de datos

El proyecto utiliza **MySQL** como sistema de gestión de base de datos.

La base de datos utilizada durante el desarrollo es:

```text
ProyectoModulo7
```

### Tabla `usuarios`

La tabla principal del proyecto contiene información de los usuarios:

```text
usuarios
│
├── user_id
├── nombre
├── email
├── password
└── fecha_nacimiento
```

### Tabla `pedidos`

Para implementar las relaciones mediante Sequelize se incorporó una segunda tabla:

```text
pedidos
│
├── pedido_id
├── user_id
├── producto
├── cantidad
├── fecha_pedido
└── total
```

La columna `user_id` permite relacionar cada pedido con un usuario.

---

# 🌐 API

## 👤 Usuarios

### GET `/usuarios`

Obtiene los usuarios almacenados en la base de datos.

```text
GET http://localhost:3000/usuarios
```

La consulta utiliza paginación mediante los parámetros `page` y `limit`.

Ejemplo:

```text
GET http://localhost:3000/usuarios?page=1&limit=5
```

Parámetros:

* `page`: número de página.
* `limit`: cantidad de registros por página.

---

### POST `/usuarios`

Crea un nuevo usuario.

```text
POST http://localhost:3000/usuarios
```

Body:

```json
{
  "nombre": "Juan Perez",
  "email": "juan@email.com",
  "password": "123456",
  "fecha_nacimiento": "1990-05-15"
}
```

Ejemplo de respuesta:

```json
{
  "mensaje": "Usuario creado correctamente",
  "user_id": 11
}
```

---

### PUT `/usuarios/:id`

Actualiza los datos de un usuario existente.

Ejemplo:

```text
PUT http://localhost:3000/usuarios/11
```

Body:

```json
{
  "nombre": "Juan Perez Actualizado",
  "email": "juan.actualizado@email.com",
  "fecha_nacimiento": "1990-05-15"
}
```

Ejemplo de respuesta:

```json
{
  "mensaje": "Usuario actualizado correctamente"
}
```

Si el usuario no existe, el servidor responde con:

```text
404 Not Found
```

---

### DELETE `/usuarios/:id`

Elimina un usuario existente.

Ejemplo:

```text
DELETE http://localhost:3000/usuarios/11
```

Respuesta:

```json
{
  "mensaje": "Usuario eliminado correctamente"
}
```

---

# 🔄 CRUD

El proyecto implementa las principales operaciones CRUD sobre la tabla `usuarios`:

| Operación  | Método HTTP | Endpoint        |
| ---------- | ----------- | --------------- |
| Crear      | POST        | `/usuarios`     |
| Obtener    | GET         | `/usuarios`     |
| Actualizar | PUT         | `/usuarios/:id` |
| Eliminar   | DELETE      | `/usuarios/:id` |

Las operaciones de usuarios utilizan consultas SQL mediante **MySQL2**.

---

# 🔁 Transacciones

Se implementó un sistema de transacciones utilizando MySQL para garantizar que un conjunto de operaciones relacionadas se ejecute correctamente.

Las operaciones utilizan:

```text
BEGIN
   ↓
Operación 1
   ↓
Operación 2
   ↓
COMMIT
```

En caso de producirse un error:

```text
BEGIN
   ↓
Operación 1
   ↓
❌ Error
   ↓
ROLLBACK
```

De esta manera, si una de las operaciones falla, los cambios realizados durante la transacción pueden revertirse.

También se implementó el registro de transacciones exitosas y fallidas mediante middleware y archivos de log.

---

# 🧩 Sequelize ORM

El proyecto incorpora **Sequelize** como ORM para trabajar con la base de datos utilizando modelos JavaScript en lugar de realizar todas las consultas directamente mediante SQL.

La configuración se encuentra en:

```text
config/sequelize.js
```

Los modelos se encuentran en:

```text
models/
```

Actualmente se utilizan los modelos:

```text
models/User.js
models/Pedido.js
```

### Modelo User

Representa la tabla:

```text
usuarios
```

### Modelo Pedido

Representa la tabla:

```text
pedidos
```

---

# 🔗 Relaciones entre modelos

Se implementó una relación de tipo **uno a muchos (1:N)**:

```text
Usuario
   │
   └── tiene muchos
           ↓
        Pedidos
```

En Sequelize se utiliza:

```javascript
User.hasMany(Pedido, {
    foreignKey: "user_id",
    as: "pedidos"
});
```

Y la relación inversa:

```javascript
Pedido.belongsTo(User, {
    foreignKey: "user_id",
    as: "usuario"
});
```

Las asociaciones se encuentran centralizadas en:

```text
models/associations.js
```

Esto permite mantener separada la definición de los modelos de la configuración de sus relaciones.

---

## 👥 Usuarios con pedidos

### GET `/usuarios-pedidos`

Obtiene los usuarios junto con sus pedidos utilizando Sequelize y `include`.

```text
GET http://localhost:3000/usuarios-pedidos
```

La consulta permite obtener información del usuario y sus pedidos relacionados en una misma operación.

La respuesta tiene una estructura similar a:

```json
[
  {
    "user_id": 1,
    "nombre": "Juan",
    "email": "juan@email.com",
    "pedidos": [
      {
        "pedido_id": 1,
        "producto": "Notebook",
        "fecha_pedido": "2026-09-01",
        "cantidad": 1,
        "total": "850000.00"
      }
    ]
  }
]
```

Un usuario que todavía no tenga pedidos puede aparecer con:

```json
"pedidos": []
```

---

## 🧪 Pruebas de conexión

Se incorporaron archivos de prueba para verificar las conexiones con las bases de datos.

### MySQL

```text
test-db.js
```

Permite comprobar la conexión y realizar consultas utilizando MySQL2.

### Sequelize

```text
test-sequelize.js
```

Permite comprobar la autenticación y conexión mediante Sequelize.

---

## 📝 Logging

El servidor utiliza middleware personalizado para registrar las solicitudes y las operaciones relacionadas con transacciones.

Los archivos de log se generan dentro de:

```text
logs/
```

Entre ellos:

```text
events.log
transacciones.log
transaccionesFallidas.log
```

Estos archivos son generados durante la ejecución y se encuentran excluidos del control de versiones mediante:

```gitignore
logs/*.log
```

---

## 🧩 Arquitectura

El proyecto utiliza una separación básica de responsabilidades.

### Routes

Define los endpoints disponibles y conecta cada ruta con su controller correspondiente.

### Controllers

Contienen la lógica necesaria para procesar las solicitudes y construir las respuestas.

### Middlewares

Contienen funciones que se ejecutan durante el procesamiento de las solicitudes.

Actualmente se utilizan para registrar peticiones y operaciones relacionadas con transacciones.

### Models

Contienen los modelos de Sequelize que representan las tablas de la base de datos.

### Config

Contiene la configuración de Sequelize y la conexión con la base de datos.

### Public

Contiene los archivos estáticos del proyecto, como HTML, CSS, JavaScript e imágenes.

### Logs

Almacena los registros generados durante la ejecución del servidor.

### Views

Contiene las plantillas utilizadas por Handlebars para generar contenido HTML dinámico.

---

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

---

## 📚 Objetivos de aprendizaje

Este proyecto permitió aplicar conceptos fundamentales de desarrollo backend con Node.js:

* Creación y configuración de un servidor Express.
* Uso de middleware.
* Creación y organización de rutas.
* Separación de rutas y controllers.
* Manejo de variables de entorno.
* Uso de motores de plantillas.
* Renderizado dinámico con Handlebars.
* Creación de endpoints REST.
* Manejo de archivos y logs.
* Conexión entre Node.js y MySQL.
* Consultas SQL mediante MySQL2.
* Implementación de operaciones CRUD.
* Paginación de resultados.
* Uso de transacciones y rollback.
* Registro de transacciones exitosas y fallidas.
* Uso de Sequelize ORM.
* Definición de modelos.
* Relaciones entre modelos.
* Uso de `hasMany` y `belongsTo`.
* Consultas con `include`.
* Organización modular de un proyecto Node.js.
* Control de versiones utilizando Git y GitHub.

---

## 👨‍💻 Autor

**Sebastián Alcaíno**

Proyecto desarrollado como parte del curso de **JavaScript Full Stack**.
