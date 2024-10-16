const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Ruta para actualizar el perfil
router.patch('/me', async (req, res) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true }
    ).orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error; // Arroja un error si no se encuentra el usuario
    });
    res.send(user);
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).send({ message: err.message });
    }
    res.status(400).send({ message: 'Error al actualizar el perfil', error: err.message });
  }
});

// Ruta para actualizar el avatar
router.patch('/me/avatar', async (req, res) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true }
    ).orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error; // Arroja un error si no se encuentra el usuario
    });
    res.send(user);
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).send({ message: err.message });
    }
    res.status(400).send({ message: 'Error al actualizar el avatar', error: err.message });
  }
});

// Exporta las rutas
module.exports = router;
