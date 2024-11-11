var express = require('express');
var router = express.Router();

// Route Services
router.get('/', (req, res) => {
    res.render('services', { title: 'Découvrez nos services ici!' });
  });

module.exports = router;