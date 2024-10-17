# Tripleten web_project_around_express

# Proyecto API de Usuarios y Tarjetas

## Descripción
Este proyecto es una API RESTful para gestionar usuarios y tarjetas, con funcionalidades para crear, actualizar, eliminar y dar likes a tarjetas.

## Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose

## Instrucciones de instalación
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Iniciar MongoDB localmente o conectarlo a MongoDB Atlas.
4. Ejecutar `npm run start` para iniciar el servidor.

## Rutas de la API

### Usuarios:
- `GET /users`: Devuelve todos los usuarios.
- `PATCH /users/me`: Actualiza el perfil del usuario.
- `PATCH /users/me/avatar`: Actualiza el avatar del usuario.

### Tarjetas:
- `GET /cards`: Devuelve todas las tarjetas.
- `POST /cards`: Crea una nueva tarjeta.
- `PUT /cards/:cardId/likes`: Dar like a una tarjeta.
- `DELETE /cards/:cardId/likes`: Eliminar un like de una tarjeta.
