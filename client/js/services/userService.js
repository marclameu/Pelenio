angular.module("pelenio").factory('userService', function($http, config){
	var _getUsuarios = function(){
		return $http.get(config.baseUrlApi + '/usuarios');
	};

	var _salvarUsuario = function(usuario){
		return $http.post(config.baseUrlApi + '/usuario', usuario);
	};

	var _getUsuario = function(id){
		return $http.get(config.baseUrlApi + '/usuario/' + id);
	}

	return{		
		getUsuarios: _getUsuarios,
		salvarUsuario: _salvarUsuario,
		getUsuario: _getUsuario
	};
});