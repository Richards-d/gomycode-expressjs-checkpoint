var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bienvenue sur notre page d\'accueil!' });
});

module.exports = router;
