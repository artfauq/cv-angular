app.directive('activite', function() {
    return {
        restrict: 'A',
        scope: {
            activite: '=info'
        },
        templateUrl: 'scripts/templates/activite.html'
    }
});