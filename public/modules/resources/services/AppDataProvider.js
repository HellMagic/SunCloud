angular.module('resources')
    .factory('AppDataProvider', ['$http', '$q', function ($http, $q) {

        var getApp = function(appId) {
            var defered = $q.defer();
            var appPromise = defered.promise;
            $http({
                method: "GET",
                url: "/apps/" + appId
            }).success(function(app){
                defered.resolve(app);
            }).error(function(err){
                defered.reject(err);
            });
            return appPromise;
        };

        var getAllApps = function (callBack) {
            var defered = $q.defer();
            var appsPromise = defered.promise;
            $http({
                method: "GET",
                url: "/apps"
            }).success(function (apps) {
                defered.resolve(apps);
                if(callBack){
                    callBack(apps);
                }
            }).error(function (err) {
                defered.reject(err);
                console.log(err);
            });
            return appsPromise;
        };

        var getAllRootApps = function (callBack) {
            var defered = $q.defer();
            var appsPromise = defered.promise;
            $http({
                method: "GET",
                url: "/apps?create_by=root"
            }).success(function (apps) {
                if(callBack){
                    callBack(apps);
                }
                defered.resolve(apps);
            }).error(function (err) {
                console.error(err);
                defered.reject(err);
            });
            return appsPromise;
        };

        var getAppsBySchool = function (schoolId, callBack) {
            var defered = $q.defer();
            var appsPromise = defered.promise;
            $http({
                method: "GET",
                url: "/apps?$or=[{create_by=root},{$and=[{create_by=admin},{school=schoolId}]}]"
            }).success(function (apps) {
                callBack(apps);
                defered.resolve(apps);
            }).error(function (err) {
                console.error(err)
            });
            return appsPromise;
        };

        var getAppsByTeacher = function (teacherId, callBack) {
            var defered = $q.defer();
            var appsPromise = defered.promise;
            $http({
                method: "GET",
                url: "/apps?$or=[{create_by=root},{create_by=admin},{$and=[{create_by=teacher},{teacher=teacherId}]}]"
            }).success(function (apps) {
                callBack(apps);
                defered.resolve(apps);
            }).error(function (err) {
                console.error(err)
            });
            return appsPromise;
        };

        var getAppsByRooms = function (rooms, callBack) {
            var defered = $q.defer();
            var appsPromise = defered.promise;
            $http({
                method: "GET",
                url: "/apps?rooms=" + rooms
            }).success(function(apps) {
                if(callBack){
                    callBack(apps);
                }
                defered.resolve(apps);
            }).error(function(err){
                console.error(err);
                defered.reject(err);
            });
            return appsPromise;
        };

        var createApp = function(appName, user, role) {
            var appData = {};
            appData.name = appName;
            appData.created_at = Date.now();

            if(role === 'root') {
                appData.create_by = 'root'
            }else if(role === 'admin'){
                appData.create_by = 'admin';
                appData.school = user.school;
            }else {
                appData.create_by = 'teacher';
                appData.teacher = user._id;
            }
            return $http({
                method: "POST",
                url: "/apps",
                data: appData
            })
        };

        var updateApp = function(appInfo) {
            return $http({
                method: "PUT",
                url: "/apps/" + appInfo._id,
                data: appInfo
            });
        };

        var deleteApp = function(appId) {
            return $http({
                method: "DELETE",
                url: "/apps/" + appId
            })
        };

        var addAppToRooms = function(app, rooms) {
            var roomTemp = _.uniq(app.rooms.concat(rooms));
            return $http({
                method: "PUT",
                url: "/apps/" + app._id,
                data: {
                    rooms: roomTemp
                }
            })
        };

        var deleteAppFromRooms = function(app, rooms) {
            var roomTemp = _.difference(app.rooms, rooms);
            return $http({
                method: "PUT",
                url: "/apps/" + app._id,
                data: {
                    rooms: roomTemp
                }
            })
        };

        var editAppName = function(appId, newName) {
            $http({
                method: "PUT",
                url: "/apps/" + appId,
                data: {
                    name: newName
                }
            })
        };



        return {
            getApp: getApp,
            getAllApps: getAllApps,
            getAllRootApps: getAllRootApps,
            getAppsBySchool: getAppsBySchool,
            getAppsByTeacher: getAppsByTeacher,
            getAppsByRooms: getAppsByRooms,
            createApp: createApp,
            updateApp: updateApp,
            deleteApp: deleteApp,
            addAppToRooms: addAppToRooms,
            deleteAppFromRooms: deleteAppFromRooms
        };
    }]);
