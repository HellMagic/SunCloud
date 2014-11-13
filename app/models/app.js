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
    version_name: String,
    created_at: Date,
    deleted_at: Date,
    file_content_type: String,
    file_file_name: String,
    file_file_size: Number,
    file_updated_at: Date,
    pakage: String,
    status: {
        type: String,
        enum: ['release']
    },
    updated_at: Date,
    uuid: String,
    ts: Number,
    id: Number,
    whats_new: String,
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
