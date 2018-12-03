export default ($scope, $http) => {
  'ngInject';

  // Fetch data from JSON file
  $http.get('./assets/cv-fr.json').then(response => {
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
};
