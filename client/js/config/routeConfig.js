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
	.when("/temporada/novo", {
		templateUrl: "view/seasons/newSeason.html",
		controller: "newSeasonController"	
	})	
	.when("/temporada/listar", {
		templateUrl: "view/seasons/seasons.html",
		controller: "seasonController",
		resolve: {
			temporadas: function(seasonService){
				return seasonService.getSeasons();				
			}
		}		
	})
	.when("/temporada/detalhes/:id", {
		templateUrl: "view/seasons/detalhes.html",
		controller: "detalharSeasonController",
		resolve: {
			temporada: function($route, seasonService){
				return seasonService.getSeason($route.current.params.id);				
			}
		}		
	})						
});

