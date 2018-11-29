import angular from 'angular';

import competence from './directives/competence';
import experience from './directives/experience';
import outil from './directives/outil';
import capitalize from './filters/capitalize';
import formatDate from './filters/formatDate';

import MainController from './controllers/MainController';

const app = angular.module('myApp', ['angular.filter']);

app.controller('MainController', MainController);
app.directive('competence', competence);
app.directive('experience', experience);
app.directive('outil', outil);
app.filter('capitalize', capitalize);
app.filter('formatDate', formatDate);
