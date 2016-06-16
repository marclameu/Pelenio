angular.module('pelenio').controller('newUserController', function($scope, userService, $location){	
	$scope.salvarUsuario = function(usuario){		
		console.log(usuario);
		userService.salvarUsuario(usuario).success(function(response){
			//console.log('Usuario cadastrado com sucesso => '+ response);
			$location.path('/users');
		}).error(function(response){
			//console.log('Nao foi possivel cadastrar => '+ response);
		});		
	};	
});