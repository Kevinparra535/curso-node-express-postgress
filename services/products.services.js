/* eslint-disable no-unused-vars */
const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];

    this.generate(); // Iniciamos nuestros servicios de usuarios
  }

  async generate() {
    const limit = 10;

    // Push de productos
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        nombre: faker.commerce.productName(),
        precio: parseInt(faker.commerce.price(), 10), // Numero en base 10
        descripcion: faker.lorem.sentence(),
        imagen: faker.image.imageUrl(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  // Funciones para los servicios
  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    // Devolvemos los datos
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    // Devolvemos un solo dato
    const product = this.products.find((item) => item.id == id);

    if (!product) {
      throw boom.notFound('Producto no encontrado');
    }

    if(product.isBlocked){
      throw boom.conflict('Producto bloqueado');
    }

    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };

    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }

    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
