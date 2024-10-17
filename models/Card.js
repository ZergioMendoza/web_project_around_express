const mongoose = require('mongoose');

// Define el esquema de tarjeta
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const urlRegex = /^(http|https):\/\/(www\.)?[a-zA-Z0-9._~:/?%#@!$&'()*+,;=-]+$/; // Corregido el regex
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} no es un enlace válido!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exporta el modelo de tarjeta
module.exports = mongoose.model('Card', cardSchema);
