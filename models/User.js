const mongoose = require('mongoose');

// Expresión regular corregida
const urlRegex = /^(http|https):\/\/(www\.)?[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]+$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => urlRegex.test(v), // Asegúrate de que la validación funcione correctamente
      message: (props) => `${props.value} no es una URL válida!`,
    },
  },
}, { versionKey: false });

const User = mongoose.model('User', userSchema);
module.exports = User;
