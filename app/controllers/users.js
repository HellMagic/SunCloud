'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./users/authentication.js'),
	require('./users/authorization.js'),
	require('./users/password.js'),
	require('./users/profile.js'),
	require('./users/create.js')

);
