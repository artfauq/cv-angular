app.directive('competence', function() {
    return {
        restrict: 'E',
        scope: {
            element: '='
        },
        templateUrl: 'js/angular/templates/competence.html'
    };
});