angular.module('pelenio').factory('autenticationInterceptor', function($q, $rootScope, $localStorage, $location){
	return{

		request: function(config){
			config.headers = config.headers || {};            
            if ($localStorage.token) {
                console.log('Enviando token já obtido em cada requisição');
                config.headers['Authorization'] = $localStorage.token;
                $rootScope.usuarioLogado = $localStorage.usuarioLogado;
            }
            return config;
		},


		response: function(response){
            /*
			var token = response.headers('Authorization');
            console.log(response.headers());
            if (token != null) {
                $localStorage.token = token;
                $rootScope.usuarioAutenticado    = true;
                console.log('Token no session storage: ', token);
            }
            else 
            {
                $rootScope.usuarioAutenticado = false;
            }            
            */
            return response;
		},

	};
})