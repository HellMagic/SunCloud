'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
    username: String,
    lastLogin: Date
});

mongoose.model('Session', SessionSchema);