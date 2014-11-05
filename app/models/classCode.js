'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var classCodeSchema = new Schema({
    code: String,
    quantity: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
classCodeSchema.statics.deleteClassCode = function(classCode, callback) {
    this.remove({
        code: {
            "$in": classCode
        }
    }, callback);
};

classCodeSchema.statics.createClassCode = function() {
    var CHARNUM = 26;
    var classCode = [];
    while (classCode.length < 4) {
        var char = String.fromCharCode(parseInt(Math.random() * CHARNUM) + 65);
        if (char !== 'I' && char !== 'O') {
            classCode.push(char);
        }
    }
    return classCode.join('');
};

mongoose.model('ClassCode', classCodeSchema);
