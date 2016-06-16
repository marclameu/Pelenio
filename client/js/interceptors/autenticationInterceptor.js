angular.module('pelenio').factory('autenticationInterceptor', function($q, $q, $rootScope, $localStorage, $location){
	return{
		request: function(config){
			config.headers = config.headers || {};
            if ($localStorage.token) {
                console.log('Enviando token já obtido em cada requisição');
                config.headers['Authorization'] = $localStorage.token;
            }
            return config;
		},

		response: function(response){
			var token = response.headers('Authorization');
            if (token != null) {
                $localStorage.token = token;
                console.log('Token no session storage: ', token);
            } 
            return response;
		},

	};
})