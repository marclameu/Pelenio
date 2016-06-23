angular.module("pelenio").config(function($routeProvider){
	$routeProvider
	.when("/usuario/listar", {
		templateUrl: "view/users/users.html",
		controller: "userController",
		resolve: {
			usuarios: function(userService){
				return userService.getUsuarios();
			}
		}		
	})
	.when("/usuario/novo", {
		templateUrl: "view/users/newUser.html",
		controller: "newUserController"	
	})	
	.when("/usuario/detalhes/:id", {
		templateUrl: "view/users/detalhes.html",
		controller: "detalharUserController",
		resolve: {
			usuario: function($route, userService){				
				return userService.getUsuario($route.current.params.id);
			}			
		}

	})	
	.when("/season/novo", {
		templateUrl: "view/seasons/newSeason.html",
		controller: "newSeasonController"	
	})	
});

