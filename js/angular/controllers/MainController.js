app.controller('MainController', function($scope, dataFetch) {

    // Fetch data from JSON file
    dataFetch.then(function(response) {
        var data = response.data;

        var experiences = data.experiences;
        var competences = data.competences;
        var outils = data.outils;

        experiences.forEach(function(projet, index) {
            projet.dateDebut = new Date(projet.dateDebut).getTime();
        });

        $scope.sections = {
            experiences: experiences,
            competences: competences,
            outils: outils
        };
    });

    // Active Section
    $scope.activeSection = 'experiences';

    $scope.sectionChange = function(input) {
        $scope.activeSection = input;
    };

    $scope.getClass = function(input) {
        return ($scope.activeSection == input) ? 'active' : '';
    };

    // Timeline Order By
    var orderBy = ["-dateDebut", "dateDebut", "type"];
    var i = 0;
    $scope.propertyName = orderBy[i];

    $scope.sortBy = function() {
        if (i < (orderBy.length - 1)) {
            i++;
        } else {
            i = 0;
        }

        $scope.propertyName = orderBy[i];
    };

    $scope.isSelected = function(input) {
        return ($scope.propertyName == input) ? true : false;
    };


});