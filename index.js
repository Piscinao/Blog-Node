const express = require("express");
const app = express();
const connection = require("./database/database");
const bodyParser = require("body-parser");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");




//Database

connection
  .authenticate()
  .then(() => {
    console.log("Connection works!");
  })
  .catch((msgError) => {
    console.log(msgError);
  });

//Define router prefix and import controller routes
app.use("/", categoriesController, articlesController);

app.get("/", (req, res) => {
    res.render("index");
  
});


//View engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.listen(8080, () => {
  console.log("Server is running!");
});

