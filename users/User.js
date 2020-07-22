const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },password:{
      type: Sequelize.STRING,
      allowNull: false
  }
})

//Create table on db if not exists
//User.sync({force: false});

module.exports = User;