'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    Room = mongoose.model('Room'),
    _ = require('lodash');

exports.getMyClasses = function(req, res){
    console.log('The teacher is: ' + req.query.teacher);
    Room.find({teachers:{$elemMatch:{teacher: req.query.teacher}}},function(err, rooms){
        if(err){
            console.error(err);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }else{
            return res.status(200).send(rooms)
        }
    })


};

var mongoose = require('mongoose');
var Room = mongoose.model('Room');

exports.getRoomById = function (req, res, next, roomId) {
    Room.findOne(
        {"_id": roomId},
        function (err, room) {
            if (err)return next(err);
            if (!room) return next(new Error('Failed to load Room' + roomId));
            room = JSON.parse(JSON.stringify(room));
            req.room = room;
            next();
        }
    );
};

exports.createRoom = function (req, res) {
    Room.createRoom(req.body, function (err, room) {
        if (err) return res.json(500, err);
        return res.json(room);
    });
};

exports.removeRoom = function (req, res) {
    Room.removeRoom({"_id": req.room._id}, function (err, room) {
        if (err) return res.json(500, err);
        return res.json({"_id": req.room._id});
    });
};

exports.getCountBySchool = function (req, res) {
    Room.aggregate({
        $group: {
            _id: "$school",
            count: {
                $sum: 1
            }
        }
    }, function (err, result) {
        if (err) return res.json(500, err);
        return res.json(result);
    })
};
