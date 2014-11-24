'use strict';

/**
 * Module dependencies.
 */
var _ = require('underscore'),
    errorHandler = require('./errors'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Tablet = mongoose.model('Tablet'),
    UserTablet = mongoose.model('UserTablet'),
    Room = mongoose.model('Room');

/**
 * get school
 * @param req
 * @param res
 */

exports.getSchool = function(req, res) {
    console.log(req.body);
    console.log("hello world");
    var school = [{
        name: "阳光书屋",
        uuid: "235343552"
    },
        {
            name: "光合新知",
            uuid: "124333232342"
        }];

    //res.set('Content-Type', 'application/json');
    res.status(200).send(school);

};

/**
* Tablet Loggin
 */
exports.tabletLogin = function(req,res) {

    console.log('hello world!');
    console.log(req.body.name);
    console.log(req.body.machine_id);




    // Login, check if user exists. If yes, login success, otherwise failed.
    User.findOne({username: req.body.name}).populate('school').exec(function(err, user) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (user) {
                //user.userType = req.body.user_type;
                if(!_.contains(user.roles, req.body.user_type)){
                    user.roles.push(req.body.user_type);
                    user.save(function(err){
                        if(err) {
                            console.error(err);
                        }
                    })
                }
                // Update the tablet infomation in db, if not exist, create one.

                Tablet.update({machine_id: req.body.machine_id},{machine_id: req.body.machine_id,OS_type: req.body.os_type, OS_version: req.body.os_version, school: user.school, lastUpdate: Date.now()},
                    {upsert: true},function(err){
                        if(err){
                            console.error(err);
                            return res.status(400).send({
                                status: 400,
                                message: errorHandler.getErrorMessage(err)
                            });
                        }
                    });


                Room.findOne({students: user._id}, function(err,room){
                    if(err){
                        console.error(err);
                    }else{
                        var userInfo = {
                            user_avatar: null,
                            user_name: user.username,
                            user_account_type: req.body.user_type,
                            user_school: user.school.name,
                            user_birthday: user.birthday,
                            user_allowed_apps:['com.hujiang.chengyu'],
                            user_grade: user.grade,
                            user_class: room.name,
                            user_password: '123456'
                        };
                        Tablet.findOne({machine_id: req.body.machine_id}, function(err, tablet){

                            UserTablet.findOne({userId: user._id, tabletId: tablet._id}, function(err, record){
                                if(err){
                                    res.send({status: 404, message: "数据库错误"});
                                }else{
                                    if(record){
                                        res.send( { status: 200, message: "登录成功!", access_token: record.access_token, user_info: userInfo });
                                    }else {
                                        UserTablet.findOne({userId: user._id},function(err, anotherTablet){
                                            if(err){
                                                res.send({status: 404, message: "数据库错误"});
                                            }else{
                                                if(anotherTablet){
                                                    res.send({status: 402, message: '错误：用户已登录到另一台设备上:'});
                                                }else{
                                                    UserTablet.findOne({tabletId: tablet._id},function(err, anotherUser){
                                                        if(err){
                                                            res.send({status:404, message:"数据库错误"});
                                                        }else{
                                                            if(anotherUser){
                                                                res.send({status: 403, message: "错误：另一个用户" + anotherUser.name + "正在使用该设备，请先在后台登出"});
                                                            }else{
                                                                UserTablet.addRecord(user._id, tablet._id,function(err, newRecord) {
                                                                    res.status(200).send({
                                                                        status: 200,
                                                                        message: "登录成功！",
                                                                        access_token: newRecord.access_token,
                                                                        user_info: userInfo
                                                                    });
                                                                })
                                                            }
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        })




                    }
                });




            } else{
                res.status(401).send({status: 401, message: 'No such user named '+ req.body.name });

            }
        }
    });

    //res.status(200).send({message:"登录成功！", access_token:"dsfds", user_info:"" });


};

/**
 * Force user logout from tablet
 */
exports.tabletLogout = function(req, res) {
    var tabletId = req.body.tabletId;
    var userId = req.body.userId;

    UserTablet.removeRecord(userId, tabletId,function(err,record){
        if(err){
            res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            })
        }else{
            res.send(200);
        }
    });

};

exports.checkToken = function(req, res){
    //req.query.access_token
    UserTablet.findOne({access_token: req.query.access_token},function(err, record){
        if (err) {
            res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            })
        } else {
            if(record) {
                var userInfo = record.userId;
                res.status(200).send({status: 200, user_info: userInfo} );
            } else {
                res.status(401).send({status: 401});

            }
        }



    });


};


//
//    req.body.machine_id
//    req.body.os_type
//    req.body.os_version
//    req.body.name
//    req.body.user_type
//    req.body.school_id
//    req.body.grade
//    req.body.class

