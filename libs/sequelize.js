const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres', // Esta variable nos dice que tipo de base de datos estamos utilizando
  logging: true, // Resulta de comando directo SQL, nos lo va a mostrar en la consola
});

setupModels(sequelize); // Le pasamos la conexion

sequelize.sync(); // Utiliza los modelos y crea esa estructura, Sincronizando con la base de datos

module.exports = sequelize;
