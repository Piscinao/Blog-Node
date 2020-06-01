const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define("categories", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }, slug:{
    type: Sequelize.STRING,
    allowNull: false
  }
})

//Create table on db if not exists
//Category.sync({force: true});

module.exports = Category;