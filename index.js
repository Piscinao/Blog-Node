const express = require("express");
const app = express();
const connection = require("./database/database");
const bodyParser = require("body-parser");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

//View engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


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
app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {

  Article.findAll({
    order:[
      ['id', 'DESC']
    ]
  }).then(articles => {
    res.render("index", {articles: articles});
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug
    }
  }).then(article => {
    if(article != undefined){
      res.render("article", {article: article});
    }else{
      res.redirect("/");

      }
    }).catch(err => {
      res.redirect("/");
    });
  })


app.listen(8090, () => {
  console.log("Server is running!");
});

