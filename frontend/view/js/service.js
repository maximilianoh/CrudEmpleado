angular.module('MiPrimeraAplicacion')
.service('miServicio', function miServicio ($http) {
	url='http://localhost:8080/empleado';
    this.getEmpleados = function getEmpleados(){
        return $http.get(url+'/list').then(function(res){ 
        	return(res);
    	}); 
	},
	this.crearEmpleado = function crearEmpleado(empleado){
        return $http.post(url+"/crear", empleado).then(function(res){ 
        	return(res);
    	}); 
	},
	this.editarEmpleado = function editarEmpleado(empleado){
        return $http.put(url+"/editar/", empleado).then(function(res){ 
        	return(res);
    	}); 

	},
	this.deleteEmpleado = function deleteEmpleado(id,empleadoeliminado){
        return $http.delete(url+"/eliminar/"+id, empleadoeliminado).then(function(res){ 
        	return(res);
    	}); 

	}
});
