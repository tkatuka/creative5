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
    $scope.results = [];
    $scope.addMovie = function() {
        var url = "/m/" + $scope.username;
        var newMovie = {title: $scope.title, year: $scope.year, dvd: $scope.dvd, bluray: $scope.bluray, threed: $scope.threed, fourk: $scope.fourk, digital: $scope.digital};
        console.log(newMovie);
        return $http.post(url, newMovie).success(function(response) {
            console.log("post success");
            $scope.getMovies();
        });
    };
    $scope.getMovies = function() {
        var url = "/m/" + $scope.username;
        console.log("Getting movies for " + url);
        return $http.get(url).success(function(response) {
            console.log("get worked?");
            console.log(response);
            $scope.movielist = response;
        })
    };
    $scope.flagdvd = function(id, dvd, bluray, threed, fourk, digital) {
        var url = "/m/" + id;
        var x = {id: id, dvd: dvd, bluray: bluray, threed: threed, fourk: fourk, digital: digital};
        console.log(x);
        return $http.put(url, x).success(function(response) {
            $scope.getMovies();
        });
    }
    $scope.login = function() {
        $scope.getMovies();
    };
    $scope.delete = function(id) {
        console.log("delete: " + id);
        var url = "/m/" + id;
        return $http.delete(url).success(function(response) {
            $scope.getMovies();
        });
    }
    $scope.find = function() {
        var url = "https://api.themoviedb.org/3/search/movie?api_key=6ea2889ff6b4a6149ab6bd30b2e17de2&query=" + $scope.title;
        return $http.get(url).success(function(response) {
            console.log(response);
            $scope.results = response.results;
        })
    }
    $scope.setMovie = function(title, date) {
        $scope.title = title;
        $scope.year = date.substring(0, 4);
        $scope.results = "";
    }
});

