// Aquí nos encargamos de enviar la conexion a los modelos

const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');

// Este es el setup inicial de sequelize
function setupModels(sequelize) {
  // Una vez vaya a la conexion voy al modelo y haga un init, pasándole el esquema y la config
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  // Aca ejecutamos nuestras asociaciones/relaciones
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = setupModels;
