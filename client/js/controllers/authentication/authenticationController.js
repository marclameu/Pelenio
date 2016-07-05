angular.module('pelenio').controller('authenticationController', function($scope, ngToast, $localStorage, $rootScope, $location, authenticationService){	
	$scope.login = function(user){
		authenticationService.login(user).success(function(response){
			$localStorage.token = response['Authorization'];
			$localStorage.usuarioLogado = response['user'];			
			ngToast.create('Seja bem vindo ' + $localStorage.user.name);
			$location.path('usuario/listar');
		}).error(function(response){
			console.log('Não foi possível efetuar o login!');
		});

	};

	$scope.logout = function(){		
		$localStorage.token 			= null;
		$localStorage.usuarioLogado 	= null;		
		$rootScope.usuarioLogado		= null;
		ngToast.create('Logout realizado com sucesso!');
		$location.path('login');
	}
});