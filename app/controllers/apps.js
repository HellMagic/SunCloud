'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    App = mongoose.model('App'),
    _ = require('underscore'),
    path = require('path');

var fs = require('fs');
var util = require('util');

var ApkReader = require('adbkit-apkreader');

var file_path = __dirname + '/../../upload/';



exports.upload = function(req, res, next) {
    console.log('user:' + req.user);
    var file = req.files.file;
    var newApk = {};
    var reader = ApkReader.readFile(file.path);
    var manifest = reader.readManifestSync();
    newApk = {
        versionCode: parseInt(manifest.versionCode),
        versionName: manifest.versionName,
        package: manifest.package,
        size: file.size
    };

    var new_fileName = file.originalname.substr(0, file.originalname.lastIndexOf('.')) + '_' + newApk.versionCode + '.apk';


    var appId = req.param('appId');

    if(file.extension !== 'apk') {
        res.status(406).send({message: '只能上传后缀名为apk的文件'});
    }else{
        App.findOne({_id: appId}, function(err, app){
           if(err){
               console.error(err);
               res.status(500).send({message: '数据库错误，请重试'});
           }else{
               if(newApk.package !== app.package) {
                   res.status(406).send({message: '此文件包名和之前包名不一致，请确认此安装包是否正确'});
               }else{
                   fs.renameSync(file.path, file_path + new_fileName);

                   newApk.fileName = new_fileName;
                   app.apks = _.filter(app.apks, function(apk) {
                       return apk.fileName !== newApk.fileName;
                   });
                   var apks = app.apks.concat(newApk);

                   var max = newApk;
                   _.each(apks, function(apk) {
                       max = (apk.versionCode > max.versionCode) ? apk: max ;
                   });

                   app.apks = apks;
                   app.versionCode = max.versionCode;
                   app.versionName = max.versionName;
                   app.package = max.package;
                   app.file_path = file_path;
                   app.file_name =max.fileName;
                   console.log(app);
                   app.save(function(err){
                       if(err) {
                           console.error(err);
                           res.status(500).send({message: '数据库错误，请重试'});
                       }else{
                           res.status(200).send(newApk);
                       }
                   });
               }
           }
        });
    }

};