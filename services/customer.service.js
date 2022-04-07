const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    const newCostumer = await models.Customer.create(data, {
      include: ['user'], // Array de asociaciones
    });

    return newCostumer;
  }

  async find() {
    const response = await models.Customer.findAll({
      include: [
        'user', // Aca van todas las asociaciones
      ],
    });
    return response;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);

    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const response = await model.update(changes);
    return response;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { response: true };
  }
}

module.exports = CustomerService;
