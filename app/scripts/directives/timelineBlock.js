app.directive('timelineBlock', function() {
    return {
        restrict: 'A',
        scope: {
            info: '=',
            even: '='
        },
        templateUrl: 'scripts/templates/timelineBlock.html'
    }
});