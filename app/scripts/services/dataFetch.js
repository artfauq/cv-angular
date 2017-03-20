app.factory('dataFetch', ['$http', function ($http) {
  return $http.get('./cv-fr.json');
}]);
