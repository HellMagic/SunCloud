'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var User = mongoose.model('User');

var Schema = mongoose.Schema;

var userTabletSchema = new Schema({
    _id: { type: Schema.Types.ObjectId,
        index: true,
        default: function () {
            return new mongoose.Types.ObjectId
        }
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tabletId: {
        type: Schema.Types.ObjectId,
        ref: 'Tablet'
    },
    access_token: String,
    loginTime: Date

});


var calculateAccessToken = function(userId,tabletId){

    var salt = "sunbookistheelevatorfortheadvancementofusruralkids";
    var str = tabletId.toString() + ';' + userId.toString() + ';' + Date.now().toString();
    return crypto.createHmac('sha1', salt).update(str).digest('hex');

};


userTabletSchema.statics.addRecord = function(userId, tabletId,callBack){
    var newRecord = {
        access_token: calculateAccessToken(userId, tabletId),
        userId: userId,
        tabletId: tabletId,
        loginTime: Date.now()
    };

    var record = new this(newRecord);

    record.save(function(err){
        if (err) {
            console.log(err.message + JSON.stringify(newRecord));
            return callBack(err);
        } else {
            return callBack(err, record);
        }
    });
};

userTabletSchema.statics.removeRecord = function(userId, tabletId,callBack){
    this.findOneAndRemove({userId: userId, tabletId: tabletId}, function(err, record){
        if(err){
            console.error(err);
            return callBack(err);
        }else{
            if(record){
                User.findOneAndUpdate({_id: userId},{$push:{xiaoshuHistory: {tablet: tabletId, logoutTime: Date.now()}} }, function(err, user){
                    if(err){
                        console.error(err);
                        return callBack(err);
                    }
                });
                return callBack(err, record);
            }
        }
    })
};

mongoose.model('UserTablet', userTabletSchema);
