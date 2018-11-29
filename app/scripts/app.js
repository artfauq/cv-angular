import angular from 'angular';

import competence from './directives/competence';
import experience from './directives/experience';
import outil from './directives/outil';
import capitalize from './filters/capitalize';
import formatDate from './filters/formatDate';

const app = angular.module('myApp', ['angular.filter']);

app.controller('MainController', ($scope, $http) => {
  // Fetch data from JSON file
  $http.get('./cv-fr.json').then(response => {
    const { experiences, competences, outils } = response.data;

    experiences.map(project => Object.assign(project, { dateDebut: new Date(project.dateDebut).getTime() }));

    $scope.sections = {
      experiences,
      competences,
      outils
    };
  });

  // Active Section
  $scope.activeSection = 'experiences';

  $scope.sectionChange = function(input) {
    $scope.activeSection = input;
  };

  $scope.getClass = function(input) {
    return $scope.activeSection === input ? 'active' : '';
  };

  // Timeline Order By
  const orderBy = ['-dateDebut', 'dateDebut', 'type'];
  let i = 0;
  $scope.propertyName = orderBy[i];

  $scope.sortBy = function() {
    if (i < orderBy.length - 1) {
      i += 1;
    } else {
      i = 0;
    }

    $scope.propertyName = orderBy[i];
  };

  $scope.isSelected = function(input) {
    return $scope.propertyName === input;
  };
});

app.directive('competence', competence);
app.directive('experience', experience);
app.directive('outil', outil);
app.filter('capitalize', capitalize);
app.filter('formatDate', formatDate);
