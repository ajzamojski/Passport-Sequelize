//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require('passport');
var LocalStrategy = require("passport-local").Strategy;
var PORT = process.env.PORT || 8080;
var db = require("./models");

//Initialize app
var app = express();

// set up ejs for templating
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//Middleware for passport
app.use(session({ 
	secret: 'soup',
	saveUninitialized: false,
	resave: false
  // cookie: { secure: true }
 }));

app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global Variables for flash
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Express validator
app.use(expressValidator({
errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root    = namespace.shift()
    , formParam = root;

  while(namespace.length) {
    formParam += '[' + namespace.shift() + ']';
  }
  return {
    param : formParam,
    msg   : msg,
    value : value
  };
}
}));

//Import our routes for express to handle
require("./routing/routes.js")(app);
require("./config/passport.js");

db.sequelize.sync({}).then(function() {
	app.listen(PORT, function(){
		console.log("App listening on PORT: " + PORT);
	});
});
