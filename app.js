var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
var cors = require('cors');

var bodyParser = require('body-parser');

var config = require('./config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

var mysql = require('mysql');
var db = mysql.createConnection(config.dbConfig());
// var pool = mysql.createConnection(config.dbConfig());
// var pool = mysql.createPool(config.dbConfig());
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

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", process.env.DOMAIN); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use('/', require('./routes/index'));

app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));
app.use('/signout', require('./routes/signout'));
app.use('/forgot-password', require('./routes/forgot-password'));
app.use('/reset-password', require('./routes/reset-password'));

app.use('/profile', require('./routes/profile'));

app.use('/log', require('./routes/log'));
app.use('/logbook', require('./routes/logbook'));
app.use('/sugar', require('./routes/sugar'));
app.use('/injection', require('./routes/injection'));
app.use('/glycated', require('./routes/glycated'));
app.use('/weight', require('./routes/weight'));
app.use('/pressure', require('./routes/pressure'));

app.use('/letter', require('./routes/letter'));

app.use('/statistic', require('./routes/statistic'));

app.use('/doctor', require('./routes/doctor'));

app.use('/api', require('./routes/api'));


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
