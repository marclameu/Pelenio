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
});

