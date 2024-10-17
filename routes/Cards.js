const router = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCard,
} = require('../controllers/cardsController');

// Rutas para tarjetas
router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);

module.exports = router;
