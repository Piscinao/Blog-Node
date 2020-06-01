const express = require("express");
const router = express.Router();

router.get("/articles", (req, res) => {
    res.send("Router of articles")
});

router.get("/admin/articles/new", (req, res) => {
  res.send("Route to create a any article");
});

module.exports = router;