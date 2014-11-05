'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../config/config');
var Room = mongoose.model('Room');

var SchoolSchema = new Schema({
        _id: {
            type: Schema.Types.ObjectId,
            default: function () {
                return new mongoose.Types.ObjectId
            }
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        uuid: String,
        ts: String,
        address: String,
        serverUrl: String,
        template: {
            type: Schema.Types.ObjectId,
            ref: 'Template'
        }

    }
);



SchoolSchema.statics.removeSchool = function (schoolId, callBack) {
    var schoolModel = this;
    Room.removeRoom(
        {'school': schoolId},
        function (err) {
            if (err) return callBack(err);
            schoolModel.findOneAndRemove(
                {
                    '_id': schoolId
                },
                callBack
            );
        }
    );
};

mongoose.model('School', SchoolSchema);

//School.create({name: 'SunshineLibrary'}, function(err){
//    if(err){
//        console.error(err)
//    }
//
//});
