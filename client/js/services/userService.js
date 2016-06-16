angular.module("pelenio").factory('userService', function($http, config){
	var _getUsuarios = function(){
		return $http.get(config.baseUrlApi + '/usuarios');
	};

	var _salvarUsuario = function(usuario){
		return $http.post(config.baseUrlApi + '/usuario', usuario);
	};

	return{		
		getUsuarios: _getUsuarios,
		salvarUsuario: _salvarUsuario
	};
});