var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'angular.filter']);

app.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
});

app.filter('formatDate', function() {
    return function(input) {
        return new Date(input).getTime();
    };
});