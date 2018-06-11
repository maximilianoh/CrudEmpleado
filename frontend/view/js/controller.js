angular.module('MiPrimeraAplicacion')

.controller('MiPrimerController',['$scope','growl','$http','miServicio','filterFilter','$location',
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
			if (err.status==-1) {
				growl.warning('El servidor no está corriendo.',{title: 'Empleados buscados'});
			}
			//console.log(err.status);
		});


	//funcion post
	$scope.go = function ( path ) {
	  $location.path( path );
	  var contents = $('#myModal')[0];
	  contents.show();
	}
	$scope.addEmpleado=function(){
		miServicio.crearEmpleado($scope.crear)
			.then(function(res){
				$scope.post.push(res.data);
				$scope.crear={};
			})
			.catch(function(err){
				if (err.status==-1) {
					growl.warning('El servidor no está corriendo.',{title: 'Crear Empleados'});
					$scope.crear={};
					$scope.form.$setPristine();
				}
				else{
					myJSON = JSON.stringify(err.errores);
					res = myJSON.replace("{", "");
					res = res.replace("}", "");
					while (res.includes(",")) {
					    res = res.replace(",", "\n");
					}		
				alert(res);
				}
			});
		$scope.form.$setPristine();
	}

	$scope.deleteEmpleado=function(){
		filteredArray = filterFilter($scope.post, {id:$scope.ideliminado});
		miServicio.deleteEmpleado($scope.ideliminado,$scope.eliminar)
			.then(function(res){
				if (err.status==-1) {
					growl.warning('El servidor no está corriendo.',{title: 'Eliminar Empleado'});
				}
				else{
					$scope.eliminar={};			
					index = $scope.post.indexOf(filteredArray[0]);
					$scope.post.splice(index,1);
				}
			})
			.catch(function(err){
				console.log(err);
			});
			
		$scope.ideliminado=null;
		
	}

	$scope.editEmpleado=function(){
		$scope.editado =$scope.preeditar;
		miServicio.editarEmpleado($scope.editado)
			.then(function(res){
				$scope.editar={};
				filteredArray = filterFilter($scope.post, {id:res.data.id});
				angular.copy(res.data, filteredArray[0]);
			})
			.catch(function(err){
				if (err.status==-1) {
					growl.warning('El servidor no está corriendo.',{title: 'Editar Empleado'});
					$scope.editar={};
					$scope.form2.$setPristine();
				}
				else{
					console.log(err);
				}
			});
		$scope.editad=null;
		$scope.editado=null;
		$scope.form2.$setPristine();
	}
	$scope.empleadoaEditar=function(empleado){
		$scope.editado=empleado;
		$scope.preeditar = Object.assign({}, $scope.editado);
		$scope.editad=empleado;
	}
	$scope.empleadoaEliminar=function(id){
		$scope.ideliminado=id;
	}

	$scope.limpiarAdd=function(){
		$scope.crear={};		
		$scope.form.$setPristine();
	}

	$scope.limpiarEdit=function(){
		$scope.editar={};		
		$scope.form2.$setPristine();
	}

	$scope.optionSelected=function(data){
		$scope.$apply(function(){
			$scope.buscar.nombre=data;
		})
	}

}])
;