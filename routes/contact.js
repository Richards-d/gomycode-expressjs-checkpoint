var express = require('express');
var router = express.Router();

// Route Contact
router.get('/', (req, res) => {
    res.render('contact', { title: 'Contactez-nous pour plus d\'informations!' });
  });

module.exports = router;