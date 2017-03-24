app.directive('langue', function() {
    return {
        restrict: 'A',
        scope: {
            langue: '=info'
        },
        templateUrl: 'js/templates/langue.html'
    }
});