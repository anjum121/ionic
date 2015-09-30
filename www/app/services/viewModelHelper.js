window.Creatopia = {};
///view model helper definition
(function (cr) {
    var viewModelHelper = function ($http, $q) {

        var self = this;

        self.modelIsValid = true;
        self.modelErrors = [];
        self.isLoading = false;
        self.actionOngoing = false;
        self.ongoingActions = 0;
        self.rootPath = 'https://api.500px.com/v1/photos?feature=';
        self.consumerKey = 'EWgzL1U9OU6aaWqfvSi3p5Qk2INdPOOwDct5TiF9';
        self.userName = 'Basel';

        self.apiGet = function (uri,page, data, success, failure, always) {
            var getURL = self.rootPath + uri + '&consumer_key=' + self.consumerKey +
             '&username=' + self.userName + '&page=' + page;
           $http.get(getURL , data)
                .then(function (result) {
                    handleSuccess(result, success, always);
                }, function (result) {
                    handleFailure(result, failure, always);
                });
        }

        self.apiPost = function (uri, data, success, failure, always) {
         
            $http.post(self.rootPath + uri, data)
                .then(function (result) {
                    handleSuccess(result, success, always);
                }, function (result) {
                    handleFailure(result, failure, always);
                });
        }

       

        handleSuccess = function (result, success, always) {
            if (success == null) {
               // notification.success("Successful Operation", "The operation was completed successfully");
            }
            else {
                success(result);
            }

            handleAlways(always);
        };

        handleFailure = function (result, failure, always) {
            if (failure == null) {
                if (result.status === 404) {
                    self.modelErrors = ['Wrong API call!'];
                }
                else if (result.status === 401) {
                    self.modelErrors = ['Unauthorized API call!'];
                }
                //else if (result.status != 400) {
                //    self.modelErrors = [result.status + ':' + result.statusText + ' - ' + result.data];
                //}
                else {
                    self.modelErrors = ['Something went wrong, check your internet connection and try again!'];
                }
                //notification.error("Error", self.modelErrors[0], 5000);
                
                 //notifier({title: "Error",
                 //           text: self.modelErrors[0],
                 //           type: "error",   
                 //           confirmButtonText: "Ok"
                 //       });

            }
            else {
                failure(result);
            }

            handleAlways(always);
        };

        handleAlways = function (always) {
            self.ongoingActions -= 1;

            if (self.ongoingActions === 0) {
                //loader.hide();
            }

            if (always != null) {
                always();
            }
        }

        return this;
    }
    cr.viewModelHelper = viewModelHelper;
}(window.Creatopia));

app.factory('viewModelHelper', function ($http, $q) {
    return Creatopia.viewModelHelper($http, $q);
});
