const express = require("express");
const app = express();
const session = require("express-session");
const connection = require("./database/database");
const bodyParser = require("body-parser");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");

//View engine
app.set('view engine', 'ejs');

//sessionStore
app.use(session({
  secret: "secretKeySession", cookie: {maxAge: 30000},
  resave: true,
  saveUninitialized: true
}));

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
app.use("/", usersController);



// app.use("/session", (req, res) => {

// });
// app.use("/read", (req, res) => {

// });

app.get("/", (req, res) => {

  Article.findAll({
    order:[
      ['id', 'DESC']
    ]
  }).then(articles => {
    
    Category.findAll().then(categories => {
      res.render("index", {articles: articles, categories: categories});
    });
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
      Category.findAll().then(categories => {
        res.render("article", {article: article, categories: categories});
      });
    }else{
      res.redirect("/");

      }
    }).catch(err => {
      res.redirect("/");
    });
  })


  app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
      where: {
        slug: slug
      },
      include: [{model: Article}]
    }).then(category => {
      if(category != undefined){

        Category.findAll().then(categories => {
          res.render("index", {articles: category.articles, categories: categories})
        });

      }else{
        res.redirect("/");
      }
      }).catch( err => {
        res.redirect("/");
      })
    })


app.listen(8091, () => {
  console.log("Server is running!");
});

