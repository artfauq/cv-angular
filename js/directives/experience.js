app.directive('experience', function() {
    return {
        restrict: 'E',
        scope: {
            element: '='
        },
        templateUrl: 'js/templates/experience.html'
    };
});