app.directive('competence', function() {
    return {
        restrict: 'A',
        scope: {
            categorie: '=info'
        },
        templateUrl: 'scripts/templates/competence.html'
    }
});