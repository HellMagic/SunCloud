'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TabletSchema = new Schema({
    _id: { type: Schema.Types.ObjectId,
        index: true,
        default: function () {
            return new mongoose.Types.ObjectId
        }
    },
    machine_id: String,
    name: {
        type: String,
        required: true
    },
    OS_type: String,
    OS_version: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    apps: [{
        type: Schema.Types.ObjectId,
        ref: 'App'
    }],
    lastUpdate: {
        type: Date
    },
    lockView: {
        locked: Boolean,
        unlockAfter: String
    },
    disableNetwork: {
        type: Boolean
    }
});

mongoose.model('Tablet', TabletSchema);
