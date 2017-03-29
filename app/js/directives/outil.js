app.directive('outil', function() {
    return {
        restrict: 'E',
        scope: {
            element: '='
        },
        templateUrl: 'js/templates/outil.html'
    };
});