angular.module('pelenio').controller('authenticationController', function($scope, ngToast, $localStorage, $rootScope, $location, authenticationService){	
	$scope.login = function(user){
		authenticationService.login(user).success(function(response){
			$localStorage.token = response['Authorization'];
			$localStorage.usuarioLogado = response['user'];			
			ngToast.create('Seja bem vindo ' + $localStorage.usuarioLogado.name);
			$rootScope.mensagem = '';
			$location.path('home');
		}).error(function(response){
			$rootScope.mensagem = 'Não foi possível efetuar o login! - ' + response['result'];
			console.log(response);
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