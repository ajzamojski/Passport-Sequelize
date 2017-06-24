// Requiring our models
var db = require("../models");
var User = require('../models/user.js');
var path = require("path");
var passport = require('passport');



module.exports = function (app) {

	app.get("/index", function(req, res) {

		// res.sendFile(path.join(__dirname, "../public/index.html"));
		res.render('index', { message: req.flash('signupMessage'), fillFields: req.flash('fillFields') });

	});

	app.get("/login", function(req, res) {
		// console.log("in the /profile callback");
		
		res.render('login', { loginError: req.flash('loginError') });

	});

	app.get("/profile", isLoggedIn, function(req, res) {
		// console.log("in the /profile callback");
		console.log(req.user.name);
		// console.log(req.user);
		console.log(req.isAuthenticated());
		res.render('profile', { user: req.user, loginError: req.flash('loginError') });

	});

	app.get("/logout", function(req, res) {

		req.logout();
		console.log(req.user);
		console.log(req.isAuthenticated());
		res.redirect('/login');

	});

	// app.get("/users/register", function(req, res) {
	// 	res.redirect("/index");
	// });

	app.post("/users/register", passport.authenticate('local-signup', {
			successRedirect: '/login',
			failureRedirect: '/index',
			failureFlash: true
		}));

		// console.log(req.body);
		// if (req.body.name == "" || req.body.username == "" || req.body.email== "" || req.body.password == "") {
  //   		console.log("fill out all fields");
    		
  //   		res.render('index', { fillError: req.flash('fillError', 'Please fill out all fields')});
  //   	}

	app.post("/users/login", passport.authenticate('local-login', {
			successRedirect: '/profile',
			failureRedirect: '/login',
			failureFlash: true
	}));

	// app.post("/users/register", function(req, res) {

	// 	var name = req.body.name;
	// 	var username = req.body.userName;
	// 	var email = req.body.email;
	// 	// var password = User.generateHash(req.body.password);
	// 	// var password2 = User.generateHash(req.body.password2);
	// 	var password = req.body.password;
	// 	var password2 = req.body.password2;
	// 	console.log(req.body);

	// 	//Validation
	// 		req.checkBody('name', 'Name is required').notEmpty();
	// 		req.checkBody('email', 'Email is required').notEmpty();
	// 		req.checkBody('email', 'Email is not valid').isEmail();
	// 		req.checkBody('userName', 'Username is required').notEmpty();
	// 		req.checkBody('password', 'Password is required').notEmpty();
	// 		req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
	// 	var errors = req.validationErrors();

	// 	if(errors) {
	// 		res.json(errors);
	// 		// console.log(errors);
	// 	}
	// 	else {
	// 		console.log("Passed");

	// 		db.User.create({name: name, username: username, email: email, password: password})
	// 		.done(function(err, data) {
	// 			if (err) {
	// 				throw err;
	// 			}

	// 			console.log("User registered successfully");
	// 			req.flash('success_msg', 'You are registered and can now login');
	// 			res.render('index');
	// 		});
	// 	}

	// });

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}




}