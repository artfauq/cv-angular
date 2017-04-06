app.directive('outil', function() {
    return {
        restrict: 'E',
        scope: {
            element: '='
        },
        templateUrl: 'js/angular/templates/outil.html'
    };
});