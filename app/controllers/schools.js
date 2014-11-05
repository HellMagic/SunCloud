'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    School = mongoose.model('School'),
    _ = require('lodash');

/**
 * Create a school
 */
exports.create = function(req, res) {
    var school = new School(req.body);

    school.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(school);
        }
    });
};

/**
 * Show the current school
 */
exports.read = function(req, res) {
    res.json(req.school);
};

/**
 * Update a school
 */
exports.update = function(req, res) {
    var school = req.school;

    school = _.extend(school, req.body);

    school.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(school);
        }
    });
};

/**
 * Delete an school
 */
exports.delete = function(req, res) {
    var school = req.school;

    school.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(school);
        }
    });
};



exports.getSchoolById = function (req, res, next, schoolId) {
    School.findOne(
        {"_id": schoolId},
        function (err, school) {
            if (err)return next(err);
            if (!school) return next(new Error('Failed to load School' + schoolId));
            school=JSON.parse(JSON.stringify(school));
            req.school = school;
            next();
        }
    );
};

exports.removeSchool = function (req, res) {
    School.removeSchool(req.school._id, function (err, school) {
        if (err) return res.json(500, err);
        res.json(school);
    });
};


