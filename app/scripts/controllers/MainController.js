app.controller('MainController', ['$scope', 'dataFetch', function($scope, dataFetch) {

    $scope.activeTab = 1;

    dataFetch.then(function(response) {
        var data = response.data;

        var timelineObjects = (data.formations).concat(data.projets);
        timelineObjects.sort(function(a, b) {
            return new Date(b.dateDebut) - new Date(a.dateDebut);
        });

        $scope.sections = {
            projets: {
                name: "Projets",
                content: timelineObjects,
                tab: 1
            },
            competences: {
                name: "Competences",
                content: data.competences,
                tab: 2
            },
            logiciels: {
                name: "Logiciels",
                content: data.logiciels,
                tab: 3
            },
            langues: {
                name: "Langues",
                content: data.langues,
                tab: 4
            },
            activites: {
                name: "Activites",
                content: data.activites,
                tab: 5
            }
        };
    });
}]);