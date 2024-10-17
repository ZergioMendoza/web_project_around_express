const express = require('express'); // Asegúrate de que esta línea está presente
const mongoose = require('mongoose'); // Importa mongoose
const userRoutes = require('./routes/Users'); // Importa las rutas de usuarios
const cardsRoutes = require('./routes/Cards'); // Importa las rutas de tarjetas

const app = express(); // Inicializa la aplicación Express

// Middleware para parsear JSON
app.use(express.json());

// Middleware para agregar el usuario temporalmente a cada solicitud
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133', // ID de usuario de prueba (cambia este valor si es necesario)
  };
  next();
});

// Conexión a MongoDB usando mongoose
mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    // El servidor escucha en el puerto 3000 solo después de conectarse a MongoDB
    app.listen(3000, () => {

    });
  });

// Usa las rutas de usuarios y tarjetas
app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);

// Middleware para manejar errores centralizado
// app.use((err, req, res, next) => {
//   const { statusCode = 500, message } = err;
//   res.status(statusCode).send({
//     message: statusCode === 500
//       ? 'Ocurrió un error en el servidor'
//       : message,
//   });
// });

// Ruta para manejar cualquier otra URL no existente
app.use((req, res) => {
  res.status(404).send({ message: 'Recurso no encontrado' });
});
