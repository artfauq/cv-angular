app.directive('competence', function() {
    return {
        restrict: 'E',
        scope: {
            element: '='
        },
        templateUrl: 'js/templates/competence.html'
    };
});