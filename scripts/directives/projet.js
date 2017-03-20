app.directive('projet', function() {
    return {
        restrict: 'A',
        scope: {
            projet: '=info'
        },
        templateUrl: 'scripts/templates/projet.html'
    }
});