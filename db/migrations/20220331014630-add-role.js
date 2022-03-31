'use strict';

const { UserSchema, USER_TABLE } = require('./../models/user.model');

module.exports = {
  async up(queryInterface) {
    /**
     * Le decimos que agregue una columna
     * Se va a llamar role
     * Tendra el esquema que esta en UserSchema.rol
     */

    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  async down(queryInterface) {
    /**
     * Le decimos que elimine la columna
     */

    await queryInterface.removeColumn(USER_TABLE, 'role');
  },
};
