const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');

// Vamos a definir el modelo de la tabla
const CUSTOMER_TABLE = 'customers'; // Nombre de la tabla

// Este es el esquema que estructurara la base de datos
const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },

  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },

  // Esquema para la asociaion/relacion
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      // A que tabla esta relacionada
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE', // Que quieres que hagas cuando cambie ese ID
    onDelete: 'SET NULL',
  },
};

class Customer extends Model {
  static associate(models) {
    // Relacion

    // Le decimos hacia donde va esa relacion
    this.belongsTo(models.User, {
      as: 'user', // Alias
    });
  }

  static config(sequelize) {
    /**
     * Configuraciones
     * Aca vamos a recibir la configuración de sequelize
     */

    return {
      sequelize, // Cual es la conexion que va a tener
      tableName: CUSTOMER_TABLE, // Nombre de la tabla
      modelName: 'Customer', // Nombre del modelo
      timestamps: false, // Para que se genere el campo created_at y updated_at
    };
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
