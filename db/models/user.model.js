const { Model, DataTypes, Sequelize } = require('sequelize');

// Vamos a definir el modelo de la tabla
const USER_TABLE = 'users'; // Nombre de la tabla

const UserSchema = {
  // Esquema de la tabla
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    // Camel Case para JS
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'created_at', // Snake case para sql
    type: DataTypes.DATE,
  },
};

// Clase que extiende de Model, este modelo tiene maneras en la que vamos a crear querys
// Static: no necesita instanciar la clase para poder usarla

class User extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    // Configuraciones

    return {
      sequelize, // Cual es la conexion que va a tener
      tableName: USER_TABLE, // Nombre de la tabla
      modelName: 'User', // Nombre del modelo
      timestamp: false, // Para que se genere el campo created_at y updated_at
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
