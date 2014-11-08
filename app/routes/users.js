'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users');
	var rooms = require('../../app/controllers/rooms');
	var schools = require('../../app/controllers/schools');
	var userTablets = require('../../app/controllers/userTablets');


	// Setting up the users profile api
	app.route('/me').get(users.me);
	app.route('/users').put(users.update);
	app.route('/users/accounts').delete(users.removeOAuthProvider);

	// Setting up the users password api
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

	// Finish by binding the user middleware
	app.param('userId', users.userByID);


	app.route('/rooms').post(users.restify, rooms.createRoom);
	app.route('/rooms/:roomId').delete(users.restify, rooms.removeRoom);

	app.route('/usertablet/').get(userTablets.logout);
	app.route('/usertablet/count').get(userTablets.countBySchool);

	//app.post('/users', user.requiresLogin, users.create);




	var userOptions = {
		strict: true,
		prefix: '',
		version: '',
		//middleware: [users.restify],
		findOneAndUpdate: false
	};


	var schoolOptions = {
		strict: true,
		prefix: '',
		version: '',
		middleware: [users.restify],
		findOneAndUpdate: false
	};

	var roomOptions = {
		strict: true,
		prefix: '',
		version: '',
		//middleware: [users.restify],
		findOneAndUpdate: true
	};
	var userTabletOptions = {
		strict: true,
		prefix: '',
		version: '',
		middleware: [users.restify],
		findOneAndUpdate: false
	};

	var subjectOptions = {
		strict: true,
		prefix: '',
		version: '',
		middleware: [users.restify],
		findOneAndUpdate: false
	};

	var tabletOptions = {
		strict: true,
		prefix: '',
		version: '',
		middleware: [users.restify],
		findOneAndUpdate: false
	};

	var UserModel = mongoose.model('User');
	var SchoolModel = mongoose.model('School');
	var RoomModel = mongoose.model('Room');
	var UserTabletModel = mongoose.model('UserTablet');
	var SubjectModel = mongoose.model('Subject');
	var TabletModel = mongoose.model('Tablet');

	restify.serve(app, UserModel, userOptions);
	restify.serve(app, SchoolModel, schoolOptions);
	restify.serve(app, RoomModel, roomOptions);
	restify.serve(app, UserTabletModel, userTabletOptions);
	restify.serve(app, SubjectModel, subjectOptions);
	restify.serve(app, TabletModel, tabletOptions);




	app.param('userId', users.user);
	app.param('roomId', rooms.getRoomById);
	app.param('schoolId', schools.getSchoolById);
//    app.param('classNumber', schools.class);



};
