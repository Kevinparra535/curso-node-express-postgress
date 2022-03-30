// Aquí nos encargamos de enviar la conexion a los modelos

const { User, UserSchema } = require('./user.model');

// Este es el setup inicial de sequelize
function setupModels(sequelize) {
  // Una vez vaya a la conexion voy al modelo y haga un init, pasándole el esquema y la config
  User.init(UserSchema, User.config(sequelize));
}

module.exports = setupModels;
