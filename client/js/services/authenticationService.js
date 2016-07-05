angular.module('pelenio').factory('authenticationService', function($http, config){
		var _login = function(user){
			return $http.post(config.baseUrlApi + '/login', user);
		};

		return {
			login: _login
		};
});