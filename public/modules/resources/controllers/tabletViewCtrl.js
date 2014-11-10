angular.module('resources')
    .controller('tabletViewController',
    ['TabletDataProvider', '$scope', 'AuthService', 'RoomDataProvider', '$location', '$stateParams',
        function (TabletDataProvider, $scope, AuthService, RoomDataProvider, $location, $stateParams) {

            TabletDataProvider.getTablet($stateParams.tabletId, function(tablet) {
                $scope.tablet = tablet[0];

                TabletDataProvider.getTabletUser($scope.tablet._id, function(record){
                    if(record){
                        $scope.user = record[0].userId.name
                    }else{
                        $scope.user = "暂无"
                    }
                })
            });


        }
    ]
);