const Sequelize = require('sequelize');

const connection = new Sequelize('blogDB', 'root', 'zmtprfqo', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: "-03:00"
});

module.exports = connection;