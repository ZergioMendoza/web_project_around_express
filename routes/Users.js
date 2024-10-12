// routes/Users.js
const express = require('express');
const path = require('path');
const fs = require('fs');

// Crea un router de Express
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
  const usersPath = path.join(__dirname, '../data', 'users.json');
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error al leer el archivo' });
      return;
    }
    res.send(JSON.parse(data));
  });
});

// Ruta para obtener un usuario por ID
router.get('/:id', (req, res) => {
  const usersPath = path.join(__dirname, '../data', 'users.json');
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error al leer el archivo' });
      return;
    }
    const users = JSON.parse(data);
    const user = users.find((u) => u._id === req.params.id);
    if (!user) {
      res.status(404).send({ message: 'ID de usuario no encontrado' });
      return;
    }
    res.send(user);
  });
});

// Exporta el router para que pueda ser usado en app.js
module.exports = router;
