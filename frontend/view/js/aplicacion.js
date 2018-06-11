var app = angular.module('MiPrimeraAplicacion',
	['angular-growl',
	'ngAnimate',
	'ngRoute',
	'angularUtils.directives.dirPagination']);

app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
      .when('/', {
          templateUrl: 'templates/home.html',
          controller: 'MiPrimerController'
        })
      /*
      .when('/', {
          templateUrl: 'templates/home.html',
          controller: 'MiPrimerController'
      })
      */
      .when('/crearempleado', {
          templateUrl: 'templates/modalcrear.html',
          controller: 'MiPrimerController'
        });
}]);