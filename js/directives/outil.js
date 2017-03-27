app.directive('outil', function() {
    return {
        restrict: 'A',
        scope: {
            element: '='
        },
        templateUrl: 'js/templates/outil.html'
    };
});