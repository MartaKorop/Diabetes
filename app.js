var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

//
var bodyParser = require('body-parser');

var config = require('./config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

var mysql = require('mysql');
var db = mysql.createConnection(config.dbConfig());
db.connect();

app.use(function (req, res, next) {
  req.db = db;
  next();
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: true,
}));


app.use('/', require('./routes/index'));

app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));
app.use('/signout', require('./routes/signout'));
app.use('/forgot-password', require('./routes/forgot-password'));
app.use('/reset-password', require('./routes/reset-password'));

app.use('/profile', require('./routes/profile'));

app.use('/sugar', require('./routes/sugar'));
app.use('/injection', require('./routes/injection'));


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
