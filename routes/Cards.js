const express = require('express');
const Card = require('../models/Card');
const router = express.Router();

// Ruta para obtener todas las tarjetas
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find(); // Busca todas las tarjetas en la base de datos
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Error al obtener las tarjetas' });
  }
});

// Ruta para crear una nueva tarjeta
router.post('/', async (req, res) => {
  const { name, link } = req.body; // Extrae los datos del cuerpo de la petición
  try {
    const newCard = new Card({ name, link, owner: req.user._id }); // Crea una nueva tarjeta
    await newCard.save(); // Guarda la nueva tarjeta en la base de datos
    res.status(201).send(newCard); // Envía la tarjeta creada en la respuesta
  } catch (err) {
    res.status(400).send({ message: 'Error al crear la tarjeta', error: err.message });
  }
});

// Ruta para eliminar una tarjeta
router.delete('/:cardId', async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId).orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    });
    res.send(card);
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).send({ message: err.message });
    }
    res.status(500).send({ message: 'Error al eliminar la tarjeta', error: err.message });
  }
});

// Ruta para dar like a una tarjeta
router.put('/:cardId/likes', async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // Agrega el ID del usuario al array de likes
      { new: true }
    ).orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    });
    res.send(card);
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).send({ message: err.message });
    }
    res.status(500).send({ message: 'Error al dar like a la tarjeta', error: err.message });
  }
});

// Ruta para quitar like a una tarjeta
router.delete('/:cardId/likes', async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // Elimina el ID del usuario del array de likes
      { new: true }
    ).orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    });
    res.send(card);
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).send({ message: err.message });
    }
    res.status(500).send({ message: 'Error al quitar like a la tarjeta', error: err.message });
  }
});

// Exporta las rutas
module.exports = router;
