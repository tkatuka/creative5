var gp5App = angular.module("gp5App", []);


gp5App.controller("mainCtrl", function($http, $scope) {
    $scope.username = "";
    $scope.movielist = []; //{title: The Fifth Element, year: 2001, digital: yes, dvd: yes, bluray: yes, 4k: no, 3d: no}
    //$scope.url = "/m/" + $scope.username;
    $scope.title = "";
    $scope.year = "";
    $scope.dvd = "";
    $scope.bluray = "";
    $scope.threed = "";
    $scope.fourk = "";
    $scope.digital = "";
    $scope.addMovie = function() {
        var url = "/m/" + $scope.username;
        var newMovie = {title: $scope.title, year: $scope.year};
        console.log(newMovie);
        return $http.post(url, newMovie).success(function(response) {
            console.log("post success");
        });
    };
    $scope.getMovies = function() {
        var url = "/m/" + $scope.username;
        console.log("Getting movies for " + url);
        return $http.get(url).success(function(response) {
            console.log("get worked?");
            console.log(response);
            $scope.movielist = response.data;
        })
    };
    $scope.flagdvd = function() {
        // somehow update the object database boolean for this object
    }
    $scope.login = function() {
        $scope.getMovies();
    };
});

