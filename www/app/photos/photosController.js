app.controller('photosController', function($scope,viewModelHelper,loader,$timeout) {
 
$scope.photos = [];
 $scope.currentPage = 1;
 $scope.pagesCount = 0;
 
  $scope.getPhotos = function(){
  loader.show('Loading Photos');

        viewModelHelper.apiGet('user',
          $scope.currentPage,null, 
          function(result){
           $scope.photos =  _.union($scope.photos, result.data.photos);
           $scope.pagesCount = result.data.total_pages;
           $scope.$broadcast('scroll.infiniteScrollComplete');
             loader.hide();
    
     });
 

  }
$scope.moreDataCanBeLoaded = function(){
  return $scope.currentPage <= $scope.pagesCount;
}
  $scope.loadMore = function(){
     $scope.currentPage += 1;
     $scope.getPhotos();
  }

 
  
});