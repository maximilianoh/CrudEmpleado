angular.module('MiPrimeraAplicacion')

.controller('controllerprincipal',['$scope','growl','$http','miServicio','filterFilter','$location',
	function($scope,growl,$http,miServicio,filterFilter,$location){
	$scope.listadenombre=[];
	//objeto promys sirve para manejar peticiones asincronicas
	// $http.get("https://jsonplaceholder.typicode.com/posts")

	$scope.currentPage = 0;
    $scope.pageSize = 5;

	$scope.post=[];
	$scope.encontrado=null;
	$scope.cantidad=0;
	$scope.eliminado=null;
	editado=null;
	editad=null;
	$scope.crear={};
	ideliminado=0;
	notificacion=0;
	growl.info('No se encontraron resultados.',{title: 'Empleados buscados'});

	miServicio.getEmpleados()
		.then(function(res){
			$scope.post=res.data;
			

			for (var i = res.data.length - 1; i >= 0; i--) {	
				$scope.listadenombre.push(res.data[i].nombre);
			}
		})
		.catch(function(err){
			console.log("Error");
		});

}])
;