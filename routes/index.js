// Este archivo sera nuestro sistema de routing


/**
 * Quedamos aqui, ya creamos nuestra estructura para customer
 */


const express = require('express');

const categoriesRoutes = require('./categories.router');
const productRoutes = require('./products.router');
const userRoutes = require('./users.router');
const customerRoutes = require('./customer.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); // Ruta padre
  router.use('/categories', categoriesRoutes);
  router.use('/products', productRoutes);
  router.use('/users', userRoutes);
  router.use('/customers', customerRoutes);
}

module.exports = routerApi;
