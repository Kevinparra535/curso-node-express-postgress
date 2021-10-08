// Este archivo sera nuestro sistema de routing

const express = require('express');

const categoriesRoutes = require('./categories.router');
const productRoutes = require('./products.router');
const userRoutes = require('./users.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); // Ruta padre
  router.use('/categories', categoriesRoutes);
  router.use('/products', productRoutes);
  router.use('/user', userRoutes);
}

module.exports = routerApi;
