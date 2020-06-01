const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }, slug:{
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

//Relatonships on sequelize

//One category have many articles 1-P-M
Category.hasMany(Article);
//One article belongs category 1-P-1
Article.belongsTo(Category);

//Create table on db if not exists
//Article.sync({force: true});

module.exports = Article;