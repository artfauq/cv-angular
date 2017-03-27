app.directive('competence', function() {
    return {
        restrict: 'A',
        scope: {
            element: '='
        },
        templateUrl: 'js/templates/competence.html'
    };
});