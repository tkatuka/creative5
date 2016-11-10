angular.module('movie', [])
.controller('MainCtrl', [
  '$scope',
  '$http',
  function($scope, $http){
    
    $scope.movies = [];
    $scope.create = function(movie) {
      return $http.post('/movies', movie).success(function(data){
        $scope.movies.push(data);
      });
    };
    $scope.addMovie = function() {
      if($scope.movieName === ''|| $scope.movieYear == '') { return; }
      console.log("In addMovie with "+$scope.movieName + "  " + $scope.movieYear);
      $scope.create({
        name: $scope.movieName,
	year: $scope.movieYear,
	type: $scope.movieType,
      });
      $scope.movieName = '';
      $scope.movieYear = '';
    };
    $scope.getAll = function() {
        console.log("getall function");
      return $http.get('/movies').success(function(data){
        angular.copy(data, $scope.movies);
      });
    };
    $scope.getAll();
  }
]);

