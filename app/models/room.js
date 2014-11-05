'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../config/config');
var classCodeCtl = require('../controllers/classCodes.js');
var classCodeModel = mongoose.model('ClassCode');

var RoomSchema = new Schema({
        _id: { type: Schema.Types.ObjectId,
            index: true,
            default: function () {
                return new mongoose.Types.ObjectId
            }
        },
        name: {
            type: String,
            required: true
        },
        classCode: {
            //This is the Code of the classroom.
            // Students can join this classroom with inputting this Code.
            type: String,
            required: true
        },
        grade: String,
        school: {
            type: Schema.Types.ObjectId,
            ref: 'School'//,
            //required: true
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                index: true
            }
        ],
        teachers: [
            {
                subject:[{
                    type: String,
                    default: ''
                }],
                teacher: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                    //index: true
                }
            }
        ],
        newStudents: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                index: true
            }
        ]
    }
);




RoomSchema.statics.createRoom = function (roomInfo, callBack) {
    var thisModel = this;
    classCodeCtl.createClassCode(function (err, classCode) {
        if (err) {
            console.log(err.message + JSON.stringify(roomInfo));
            return callBack(err);
        } else {
            roomInfo.classCode = classCode;
            var room = new thisModel(roomInfo);
            room.save(function (err) {
                if (err) {
                    console.log(err.message + JSON.stringify(roomInfo));
                    return callBack(err);
                } else {
                    return callBack(err, room);
                }
            });
        }
    });
};

RoomSchema.statics.removeRoom = function (roomInfo, callBack) {
    //Do something before removing the room.
    var thisModel = this;
    thisModel.find(roomInfo, {'_id': true, 'classCode': true}, function (err, rooms) {
        if (err) {
            console.log(err.message + JSON.stringify(roomInfo));
            return callBack(err);
        } else {
            var classCodes = [];
            for (var roomsIndex = 0; roomsIndex < rooms.length; roomsIndex++) {
                classCodes.push(rooms[roomsIndex].classCode);
            }
            classCodeModel.deleteClassCode(classCodes, function (err) {
                if (err) {
                    console.log(err.message + JSON.stringify(roomInfo));
                    return callBack(err);
                } else {
                    thisModel.remove(roomInfo, callBack);
                }
            });
        }
    });
};

mongoose.model('Room', RoomSchema);

