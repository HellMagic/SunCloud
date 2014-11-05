'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppSchema = new Schema({
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
    version: {
        type: String
    },
    icon: {
        type: String
    },
    url: {
        type: String
    },
    apk: {
        type: String,
        required: true
    },
    disableNetwork: {
        type: Boolean

    }
});

mongoose.model('App', AppSchema);
