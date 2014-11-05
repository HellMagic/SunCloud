'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    User = mongoose.model('User'),
    Tablet = mongoose.model('Tablet'),
    UserTablet = mongoose.model('UserTablet'),
    _ = require('underscore');

exports.logout = function(req, res){

    UserTablet.removeRecord(req.query.userId, req.query.tabletId,function(err,record){
        if(err){
            res.json(500, err);
        }
        res.json(200,record);

    })



};

exports.countBySchool = function(req, res) {
    console.log('counting tablet by school');
    UserTablet.find({}).populate({
        path: 'userId',
        match: {school: req.query.schoolId}
    }).exec(function(err,records){
        if(err){
            res.json(500, err);
        }
        var count = 0;
        _.each(records, function(record){
            if(record.userId !== null){
                count += 1;
            }
        });
        res.status(200).send({count: count});
    });

};


exports.getUserTabletById = function (req, res, next, userId) {
    UserTablet.findOne(
        {"userId": userId},
        function (err, record) {
            if (err)return next(err);
            if (!record) return next(new Error('Failed to load Room' + userId));
            record= JSON.parse(JSON.stringify(record));
            req.record = record;
            next();
        }
    );
};
