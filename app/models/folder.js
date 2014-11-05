'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FolderSchema = new Schema({
    _id: { type: Schema.Types.ObjectId,
        index: true,
        default: function () {
            return new mongoose.Types.ObjectId
        }
    }
});

mongoose.model('Folder', FolderSchema);
