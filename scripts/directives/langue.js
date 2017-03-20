app.directive('langue', function() {
    return {
        restrict: 'A',
        scope: {
            langue: '=info'
        },
        templateUrl: 'scripts/templates/langue.html'
    }
});