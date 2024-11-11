var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var servicesRouter = require('./routes/services');
var contactRouter = require('./routes/contact');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/services', servicesRouter);
app.use('/contact', contactRouter);
// Utiliser le middleware pour toutes les routes
app.use(workingHours);


// Middleware personnalisé pour vérifier l'heure
function workingHours(req, res, next) {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  // Vérification des jours (1: lundi à 5: vendredi) et des heures (9h à 17h)
  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.send("Le site est accessible uniquement du lundi au vendredi, de 9h à 17h.");
  }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
