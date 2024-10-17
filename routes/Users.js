const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
} = require('../controllers/usersController');

// Rutas para usuarios
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);

module.exports = router;
