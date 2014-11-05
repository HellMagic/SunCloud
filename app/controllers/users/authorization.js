'use strict';

/**
 * Module dependencies.
 */
var _ = require('underscore'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		req.profile = user;
		next();
	});
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: '请先登录'
		});
	}

	next();
};

/**
 * Is Self or Root
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

exports.isSelfOrAdminOrRoot = function(req, res, next) {
	var roles = req.user.roles || [];
	if(_.contains(roles, 'root') || (_.contains(roles, 'admin')) ||(req.params.username === req.user.username)) {
		return next();
	}else{
		return res.send(403, "你没有访问权限");
	}
};

/**
 *  Is self?
 */
exports.isSelf = function(req, res, next) {
	if(req.params.username === req.user.username) {
		return next();
	}else {
		return res.send(403, "你没有访问权限");
	}
};

exports.isRoot = function(req, res, next) {
	var roles = req.user.roles || [];
	if (_.contains(roles, 'root')) {
		return next();
	} else {
		return res.send(403, "你没有访问权限")
	}
};

exports.isRootOrAdmin = function(req, res, next){
	var roles = req.user.roles || [];
	if(_.contains(roles, 'root') || (_.contains(roles, 'admin'))){
		return next();
	}else{
		return res.send(403, "你没有访问权限")
	}

};


/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'User is not authorized'
				});
			}
		});
	};
};


exports.requiresAuth = function (auth, action) {//action也是可配置的
	return function(req, res, next) {
		var roles;
		if(typeof req.user == 'undefined')
			roles = [];
		else
			roles = req.user.roles || [];
		if(_.contains(roles, 'root')) {
			return next();
		}else if(_.contains(roles, 'teacher')){
			return next();
		}
		else if((auth.length === _.intersection(auth, roles).length)){
			return next();
		} else {
			return res.send(403, "你没有访问权限");
		}
	}
};

//针对“restify”给“特定的资源”配置相应的权限
exports.restify = function (req, res, next) {
	var users = '/users';
	var schools = '/schools';
	var rooms = '/rooms';
	if (req.url.slice(0, users.length) == users) {
		// start with /users
		if ((req.url == '/users' || req.url == '/users/')) {
			if (req.method == 'GET') {
				//requiresRoot(req, res, next);
				//this.requiresAuth('root')(req, res, next);
				if (req.user && req.user.roles && _.contains(req.user.roles, 'root')) {
					return next();
				} else {
					return res.send(403, "NO Authorization");
				}
			} else {
				return next();
			}
		} else {
			//requiresRootOrUserOrCode(req, res, next);
			if (
				(
				req.user &&
				req.user.roles &&
				(
				_.contains(req.user.roles, 'root') ||
				_.contains(req.user.roles, 'teacher')
				)
				) ||
				(
				req.user &&
				req.params &&
				req.params.username === req.user.username
				)
			) {
				return next();
			} else {
				return res.send(403, "No Authorization");
			}
		}
	} else if ((req.url.slice(0, schools.length) == schools) || (req.url.slice(0, rooms.length) == rooms)) {
		if (req.user) {
			if (req.method == 'GET') {
				return next();
			} else if ((req.method == 'PUT') && (req.url.slice(0, rooms.length) == rooms) && (req.user && req.user.roles && _.contains(req.user.roles, 'student'))) {
				return next();
			} else {
				if ((req.user && req.user.roles && _.contains(req.user.roles, 'root')) || (req.user && req.user.roles && _.contains(req.user.roles, 'teacher'))) {
					return next();
				} else {
					return res.send(403, "No Permission");
				}
			}
		} else {
			return res.send(403, "No Authorization");
		}
	} else {
		return next();
	}
};
