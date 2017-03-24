app.directive('experience', function() {
    return {
        restrict: 'A',
        scope: {
            element: '='
        },
        templateUrl: 'js/templates/experience.html'
    }
});