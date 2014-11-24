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
        unique: true,
        required: true
    },
    versionCode: Number,
    versionName: String,
    created_at: Date,
    deleted_at: Date,
    file_content_type: String,
    file_file_name: String,
    file_file_size: Number,
    file_updated_at: Date,
    package: String,
    file_path: String,
    file_name: String,
    status: {
        type: String,
        enum: ['release', 'test']
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
    apks: [{
        versionCode: Number,
        versionName: String,
        package: String,
        fileName: String,
        size: Number
    }],
    disableNetwork: {
        type: Boolean

    },
    default_installed: {
        type: Boolean,
        default: false
    } ,
    create_by: {
        type: String,
        enum:['root', 'admin', 'teacher']
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School'
    },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }],
    teacher: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    shared: {
        type: Boolean,
        default: true
    }
});

mongoose.model('App', AppSchema);
