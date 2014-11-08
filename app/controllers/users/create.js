'use strict';

/**
 * Module dependencies.
 */
var _ = require('underscore'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');


/**
 * Create user for sign up
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);
    var message = null;

    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }
            return res.send(400, {
                message: message
            });
        } else if ((req.user) && (req.user.roles.indexOf('root') >= 0)) {
            res.json(200, user);
        } else {
            //{username: xxx, hashed_password:xxx, have_profile}
            var response = {
                _id:user._id,
                username: user.username,
            };
            //TODO: modify the usernmae mechanism
            if (user.email) {
                response.email = user.email;
            } else if (user.phone) {
                response.phone = user.phone;
            }

            if (req.query && req.query.isTemp) {
                req.logout();
                req.login(user, function(err) {
                    if (err) return res.send(500, "temp user login new create user err");
                    return res.json(200, req.user);
                })
            } else {
                res.json(200, response);
            }
        }
    });
};