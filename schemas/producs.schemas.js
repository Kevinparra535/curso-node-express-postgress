const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(1);
const image = Joi.string().uri();

// Validacion para la creacion de un producto
const createProductSchema = Joi.object().keys({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

// Validacion para la actualizacion de un producto
const updateProductSchema = Joi.object().keys({
  name,
  price,
  image,
});

// Obtener un id antes de mostrar
const getProductSchema = Joi.object().keys({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
