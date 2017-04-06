app.directive('experience', function() {
    return {
        restrict: 'E',
        scope: {
            element: '='
        },
        templateUrl: 'js/angular/templates/experience.html'
    };
});