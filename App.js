const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
  const usersPath = path.join(__dirname, 'data', 'users.json');
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error al leer el archivo' });
      return;
    }
    res.send(JSON.parse(data));
  });
});

// Ruta para obtener un usuario por ID
app.get('/users/:id', (req, res) => {
  const usersPath = path.join(__dirname, 'data', 'users.json');
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

// Ruta para manejar cualquier otra URL no existente
app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

// El servidor escucha en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});