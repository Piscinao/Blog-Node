const Sequelize = require('sequelize');

const connection = new Sequelize('blogDB', 'root', 'zmtprfqo', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;