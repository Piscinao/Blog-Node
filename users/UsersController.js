const express = require("express");
const router = express.Router();
const User = require("./User")
const slugify = require("slugify");
const bcrypt = require("bcryptjs");


router.get("/admin/users", (req, res) => {
  User.findAll().then((users) => {
    res.render("admin/users/index", {users: users});
  })
});

router.get("/admin/users/create", (req, res) => {
  res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  //Verifica se o email já está cadastrado

  User.findOne({where: {email:email}}).then((user) => {
    if(user == undefined) {

      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
    
      User.create({
        email: email,
        password: hash,
    
      }).then(() => {
        res.redirect("/");
      }).catch((err) => {
        res.redirect("/");
      });

    }else{
      res.redirect("/admin/users/create");
    }
  });

  //teste dados formulários
  //res.json({email, password}); 
});

router.post("/categories/delete", (req, res) => {
  var id = req.body.id;

  if(id != undefined){
    // Verify if id is numeric
    if(!isNaN(id)){
      // Delete same upper id
      Category.destroy({
        where: {
          id: id
        }
      }).then(() => {
        res.redirect("/admin/categories");
      })
    } else{ // NOT A NUMBER
      res.redirect("/admin/categories");
    }

  }else{ // NOT A NUMBER
    res.redirect("/admin/categories");
  }

 });

router.get("/admin/categories", (req, res) => {

  Category.findAll().then(categories => {
    res.render("admin/categories/index", {categories: categories});
  });
  
});

router.get("/admin/categories/edit/:id", (req, res) => {
  var id = req.params.id;

  if(isNaN(id)){
    res.redirect("/admin/categories");
  }

 Category.findByPk(id).then(category => {
   if(category != undefined){

    res.render("admin/categories/edit", {category: category});

   }else{
     res.redirect("/admin/categories");
   }
 }).catch(erro => {
   res.redirect("/admin/categories");
 })
  
});

router.post("/categories/update", (req, res) => {
  var id = req.body.id;
  var title = req.body.title;

  Category.update({title: title, slug: slugify(title) } , {
    where:{
      id: id
    }
  }).then(() => {
    res.redirect("/admin/categories");
  })
});



module.exports = router;