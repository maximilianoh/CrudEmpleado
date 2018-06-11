angular.module('MiPrimeraAplicacion',[]).
factory('EmpleadoFactory',function($resource){
    return $resource('http://localhost:8080/empleado/:id',{},{
        update: {
            method: 'PUT'
        }
    });
});