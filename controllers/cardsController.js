const Card = require('../models/Card'); // Asegúrate de importar tu modelo de tarjeta

// Obtener todas las tarjetas
const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().populate('owner likes');
    return res.send(cards); // Retornar las tarjetas obtenidas
  } catch (err) {
    return res.status(500).send({ message: 'Error al obtener tarjetas', error: err }); // Retornar error si hay un problema
  }
};

// Crear una nueva tarjeta
const createCard = async (req, res) => {
  const { name, link, owner } = req.body;

  try {
    const card = new Card({ name, link, owner });
    await card.save();
    return res.status(201).send(card); // Retornar la tarjeta creada
  } catch (err) {
    return res.status(400).send({ message: 'Error al crear la tarjeta', error: err }); // Retornar error si hay un problema
  }
};

// Eliminar una tarjeta por ID
const deleteCard = async (req, res) => {
  const { cardId } = req.params;

  try {
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      return res.status(404).send({ message: 'Tarjeta no encontrada' }); // Retornar mensaje si no se encuentra la tarjeta
    }
    return res.send({ message: 'Tarjeta eliminada exitosamente' }); // Retornar mensaje de éxito
  } catch (err) {
    return res.status(500).send({ message: 'Error al eliminar tarjeta', error: err }); // Retornar error si hay un problema
  }
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
};
