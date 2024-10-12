// routes/Cards.js
const express = require('express');
const path = require('path');
const fs = require('fs');

// Crea un router de Express
const router = express.Router();

// Ruta para obtener todas las tarjetas
router.get('/', (req, res) => {
  const cardsPath = path.join(__dirname, '../data', 'cards.json');
  fs.readFile(cardsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error al leer el archivo' });
      return;
    }
    res.send(JSON.parse(data));
  });
});

// Exporta el router para que pueda ser usado en app.js
module.exports = router;
