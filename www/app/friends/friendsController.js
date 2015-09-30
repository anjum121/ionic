app.controller('friendsController', function($scope,viewModelHelper,$timeout,loader) {
 
 $scope.photos = [];
 $scope.currentPage = 1;
 $scope.pagesCount = 0;
 
  $scope.getFriends = function(){
	loader.show('Loading Friends Photos');

	      viewModelHelper.apiGet('user_friends',
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
  	 $scope.getFriends();
  }

 

  
});