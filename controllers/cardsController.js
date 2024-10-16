// controllers/cardsController.js
const Card = require('../models/Card'); // Asegúrate de importar tu modelo de tarjeta

// Obtener todas las tarjetas
const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().populate('owner likes');
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Error al obtener tarjetas', error: err });
  }
};

// Crear una nueva tarjeta
const createCard = async (req, res) => {
  const { name, link, owner } = req.body;
  
  try {
    const card = new Card({ name, link, owner });
    await card.save();
    res.status(201).send(card);
  } catch (err) {
    res.status(400).send({ message: 'Error al crear la tarjeta', error: err });
  }
};

// Eliminar una tarjeta por ID
const deleteCard = async (req, res) => {
  const { cardId } = req.params;

  try {
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      return res.status(404).send({ message: 'Tarjeta no encontrada' });
    }
    res.send({ message: 'Tarjeta eliminada exitosamente' });
  } catch (err) {
    res.status(500).send({ message: 'Error al eliminar tarjeta', error: err });
  }
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
};
