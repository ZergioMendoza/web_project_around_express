const mongoose = require('mongoose');

// Define el esquema de usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        const urlRegex = /^(http|https):\/\/(www\.)?[a-zA-Z0-9._~:/?%#\[\]@!$&'()*+,;=]+$/;
        return urlRegex.test(v);
      },
      message: props => `${props.value} no es un enlace válido!`
    }
  },
});

// Exporta el modelo de usuario
module.exports = mongoose.model('User', userSchema);
