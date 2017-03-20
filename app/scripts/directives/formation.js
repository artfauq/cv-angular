app.directive('formation', function() {
    return {
        restrict: 'A',
        scope: {
            formation: '=info'
        },
        templateUrl: 'scripts/templates/formation.html'
    }
});