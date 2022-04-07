/* eslint-disable no-unused-vars */
'use strict';

const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('./../models/customer.model');

module.exports = {
  // QueryInterface: Sirve para ejecutar estos comandos
  async up(queryInterface) {
    // Que tabla, que columna y ajustes
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user__id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });

    //... aca haríamos todos los modelos
  },

  // Down: Sirve para revertir cambios
  async down(queryInterface) {
    // Rollback de nuestra migración, revertimos la tabla
    // await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
