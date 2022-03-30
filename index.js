/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
} = require('./middlewares/error.handler');

// Creamos una nueva aplicación de express
const app = express();

// Puerto
const port = process.env.PORT || 3000;

// Sistema de rutas
const routerApi = require('./routes/index');

// Middleware
app.use(express.json());

const whitelist = ['http://localhost:3000', 'http://localhost:3001']; // Lista blanca para aceptar dominios y orígenes
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(options)); // Habilitamos cualquier dominio - origen

// Rutas
app.get('/', (req, res) => {
  res.send('Hello world!'); // Respuesta
});

routerApi(app);

// Middleware siempre deben de ir después de las rutas
app.use(logErrors);
app.use(ormErrorHandler); // Captura los errores del orm
app.use(boomErrorHandler);
app.use(errorHandler);

// Le decimos que escuche en el puerto 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
