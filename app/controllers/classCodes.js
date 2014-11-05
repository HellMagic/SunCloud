var mongoose = require('mongoose');
var ClassCode = mongoose.model('ClassCode');
var _ = require('underscore');

var getClassStr = function() {
    var CHARNUM = 26;
    var classCode = [];
    while (classCode.length < 4) {
        var char = String.fromCharCode(parseInt(Math.random() * CHARNUM) + 65);
        if (char !== 'I' && char !== 'O') {
            classCode.push(char);
        }
    }
    return classCode.join('');

}

var createClassCodeFn = exports.createClassCode = function(callback) {
    var classCodeString = getClassStr();
    ClassCode.findOne({
        code: classCodeString
    }, function(err, theClass) {
        if (err) return callback(err);
        if (theClass) {
            createClassCodeFn();
        } else {
            var classCodeObj = new ClassCode({
                'code': classCodeString,
                'quantity': 0
            });
            classCodeObj.save(function(err) {
                if (err) return callback(err);
                return callback(err, classCodeString);
            });
        }
    })
}
