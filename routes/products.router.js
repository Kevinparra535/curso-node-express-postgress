const express = require('express');
const ProductsService = require('../services/products.services');
const validartorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/producs.schemas');

// Esto nos crea un router especifico
const router = express.Router();

// Servicio de productos
const service = new ProductsService();

// Devuelve un JSON
router.get('/', async (req, res) => {
  // Traemos los datos desde nuestros servicios
  const products = await service.find();

  res.json(products); // Respuesta
});

// El orden influye en la ejecucion
router.get('/filter', (req, res) => {
  res.send('Soy un filtro'); // Respuesta
});

// Recibimos un parametro (:) y enviamos una respuesta
router.get(
  '/:id',
  validartorHandler(getProductSchema, 'params'), // Si todo esta bien ejecuta el resto de la funcion
  async (req, res, next) => {
    try {
      const { id } = req.params; // Destructuracion del parametro
      const product = await service.findOne(id); // Lo trae del servicio

      res.json(product); // Respuesta con el parametro
    } catch (error) {
      next(error); // Llamamos al middleware de forma explicita
    }
  }
);

// Ruta para hacer post
router.post(
  '/',
  validartorHandler(createProductSchema, 'body'), // Si todo esta bien ejecuta el resto de la funcion
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

// Ruta para recibir actualizaciones global
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = await service.update(id, body);
  res.json(product);
});

// Ruta para recibir actualizaciones parciales
router.patch(
  '/:id',
  validartorHandler(getProductSchema, 'params'),
  validartorHandler(updateProductSchema, 'body'), // Si todo esta bien ejecuta el resto de la funcion
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.delete(id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
