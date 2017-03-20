app.directive('logiciel', function() {
    return {
        restrict: 'A',
        scope: {
            categorie: '=info'
        },
        templateUrl: 'scripts/templates/logiciel.html'
    }
});