const User = require('../models/User');

// Controlador para obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: 'Error al obtener usuarios', error: err.message });
  }
};

// Controlador para obtener un usuario por su ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: 'Error al obtener el usuario', error: err.message });
  }
};

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;

  const user = new User({ name, about, avatar });

  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ message: 'Error al crear el usuario', error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
