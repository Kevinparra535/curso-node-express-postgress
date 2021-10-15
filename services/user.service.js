// const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');

const { models } = require('../libs/sequelize');
class UserService {
  constructor() {
    this.products = [];
    this.pool = pool;
    this.pool.on('error', (err) =>
      console.error('Unexpected error on idle client', err)
    );
  }

  async create(data) {
    return data;
  }

  async find() {
    // Consulta a la db de postgres
    const response = await models.User.findAll(); // Traigame todo lo que esta en la tabla usuarios
    return response;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
