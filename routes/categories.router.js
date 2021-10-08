const express = require('express');
const router = express.Router();


// Respuesta con dos parametros
router.get('/:categoryId/products/:productsId', (req, res) => {
  const { categoryId, productsId } = req.params; // Destructuracion del parametro

  res.json({
    producto: {
      categoryId,
      productsId,
      nombre: 'Producto 1',
      precio: 100.0,
    },
  }); // Respuesta con el parametro
});

module.exports = router;
