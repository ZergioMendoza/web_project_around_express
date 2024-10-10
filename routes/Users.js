const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Obtener todos los usuarios
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../data/users.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send({ message: 'Error al leer los datos' });
    }
    res.send(JSON.parse(data));
  });
});

// Obtener usuario por ID
router.get('/:id', (req, res) => {
  const filePath = path.join(__dirname, '../data/users.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send({ message: 'Error al leer los datos' });
    }
    const users = JSON.parse(data);
    const user = users.find(u => u._id === req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'ID de usuario no encontrado' });
    }
    res.send(user);
  });
});

module.exports = router;
