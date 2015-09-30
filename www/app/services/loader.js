app.factory('loader', ['$ionicLoading', function ($ionicLoading) {
    return {
        show: function (message) {
            $ionicLoading.show({
                template: message
            });
        },
        hide: function () {
            $ionicLoading.hide();
        }
    };
}]);

//<img src="lib/svg-loaders/svg-loaders/circles.svg" width="40" alt="">
