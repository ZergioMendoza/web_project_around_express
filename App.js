const express = require('express');

// Importa las rutas de usuarios y tarjetas
const userRoutes = require('./routes/Users');
const cardsRoutes = require('./routes/Cards');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Usa las rutas de usuarios y tarjetas
app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);

// Ruta para manejar cualquier otra URL no existente
app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

// El servidor escucha en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
