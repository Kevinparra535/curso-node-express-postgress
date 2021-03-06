const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
class UserService {
  constructor() {}

  // Creamos un usuario en base a nuestro schema
  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    // Consulta a la db de postgres
    const response = await models.User.findAll({
      include: [
        'customers', // Aca van todas las asociaciones
      ],
    }); // Tráigame todo lo que esta en la tabla usuarios
    return response;
  }

  async findOne(id) {
    // findByPk buscar por la primary key
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  // Actualizar un usuario
  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  // Eliminar un usuario
  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
