'use strict';

const {
  CustomerSchema,
  CUSTOMER_TABLE,
} = require('./../models/customer.model');

module.exports = {
  // QueryInterface: Sirve para ejecutar estos comandos
  async up(queryInterface) {
    // Que tabla y que esquema queremos crear
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);

    //... aca haríamos todos los modelos
  },

  // Down: Sirve para revertir cambios
  async down(queryInterface) {
    // Rollback de nuestra migración, revertimos la tabla
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
