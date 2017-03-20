app.controller('MainController', ['$scope', 'dataFetch', function($scope, dataFetch) {

    dataFetch.then(function(response) {
        var data = response.data;

        var projets = (data.formations).concat(data.projets);
        projets.sort(function(a, b) {
            return new Date(b.dateDebut) - new Date(a.dateDebut);
        });

        $scope.projets = projets;
        $scope.competences = data.competences;
        $scope.logiciels = data.logiciels;
        $scope.langues = data.langues;
        $scope.activites = data.activites;

    })
}]);